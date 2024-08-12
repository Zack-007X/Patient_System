using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Domain;
using System.IO;
using System.Web;
using System.Net;
using Microsoft.Extensions.Options;
using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using App.Core;
using Microsoft.AspNetCore.Http;
using IdentityModel;
using TTSW.Utils;
using TTSW.Constant;

namespace App.Database
{
    public class PaymentService : IPaymentService
    {
        private IBaseRepository<PaymentEntity, Guid> _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PaymentService(
            IBaseRepository<PaymentEntity, Guid> repository, 
            IMapper mapper, 
            IConfiguration configuration,
            DataContext dataContext,
            IHttpContextAccessor httpContextAccessor
            )
        {
            _repository = repository;
            _mapper = mapper;
            _configuration = configuration;
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;
        }

        #region Private Functions

        private string? UserId => _httpContextAccessor?.HttpContext?.User?.FindFirst(JwtClaimTypes.Id)?.Value;
        private string? Role => _httpContextAccessor?.HttpContext?.User?.FindFirst(JwtClaimTypes.Role)?.Value;

        private PaymentEntity GetEntity(PaymentInputModel model)
        {
            return _mapper.Map<PaymentEntity>(model);
        }
        private PaymentViewModel GetDto(PaymentEntity entity)
        {
            return _mapper.Map<PaymentViewModel>(entity);
        }
       
        #endregion

        #region Public Functions
        #region Query Functions

        public async Task<PaymentViewModel?> GetAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return GetDto(entity);
        }

        public async Task<PaymentEntity?> GetEntityAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            return entity;
        }

        public async Task<PaymentWithSelectionViewModel> GetWithSelectionAsync(Guid id)
        {
            var entity = await _repository.GetAsync(id);
            var i = _mapper.Map<PaymentWithSelectionViewModel>(entity);
            i.item_repairId = await _dataContext.Repairs.Select(x => _mapper.Map<RepairViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<PaymentWithSelectionViewModel> GetBlankItemAsync()
        {
            var i = new PaymentWithSelectionViewModel();
            i.item_repairId = await _dataContext.Repairs.Select(x => _mapper.Map<RepairViewModel>(x)).ToListAsync();


            return i;
        }

        public async Task<List<PaymentViewModel>> GetListBySearchAsync(PaymentSearchModel model)
        {
            var data = await (
                from m_payment in _dataContext.Payments

                join fk_repair1 in _dataContext.Repairs on m_payment.repairId equals fk_repair1.id
                into repairResult1
                from fk_repairResult1 in repairResult1.DefaultIfEmpty()


				where
                1 == 1 
                && (string.IsNullOrEmpty(model.documentCode) || m_payment.documentCode.Contains(model.documentCode))


                orderby m_payment.created descending
                select new PaymentViewModel()
                {
                    id = m_payment.id,
                    repairId = m_payment.repairId,
                    amountEA = m_payment.amountEA,
                    documentCode = m_payment.documentCode,
                    paymentMethod = m_payment.paymentMethod,
                    exchangeItems = m_payment.exchangeItems,
                    paymentDate = m_payment.paymentDate,
                    paymentNote = m_payment.paymentNote,

                    repairId_Repair_repairCode = fk_repairResult1.repairCode,

                    isActive = m_payment.isActive,
                    created = m_payment.created,
                    updated = m_payment.updated
                }
            ).Take(1000).ToListAsync();

            return data;
        }

        #endregion        

        #region Manipulation Functions



        public async Task<PaymentViewModel?> InsertAsync(PaymentInputModel model, bool is_force_save)
        {
            var entity = GetEntity(model);
            entity.id = Guid.NewGuid();


            
            if (is_force_save)
            {
                var inserted = await _repository.InsertAsync(entity);
                return await GetAsync(inserted.id);
            }
            else
            {
                await _repository.InsertWithoutCommitAsync(entity);
                return _mapper.Map<PaymentViewModel>(entity);
            }
        }

        public async Task<PaymentViewModel?> UpdateAsync(Guid id, PaymentInputModel model, bool is_force_save)
        {
            var existingEntity = await _repository.GetAsync(id);
            if (existingEntity != null)
            {
                existingEntity.repairId = model.repairId;
                existingEntity.amountEA = model.amountEA;
                existingEntity.documentCode = model.documentCode;
                existingEntity.paymentMethod = model.paymentMethod;
                existingEntity.exchangeItems = model.exchangeItems;
                existingEntity.paymentDate = model.paymentDate;
                existingEntity.paymentNote = model.paymentNote;


                if (is_force_save)
                {
                    var updated = await _repository.UpdateAsync(id, existingEntity);
                    return await GetAsync(updated.id);
                }
                else
                {
                    await _repository.UpdateWithoutCommitAsync(id, existingEntity);
                    return _mapper.Map<PaymentViewModel>(existingEntity);
                }
            }
            else
            throw new Exception("No data to update");
        }

		public async Task<int> UpdateMultipleAsync(List<PaymentInputModel> model, bool is_force_save)
        {
            foreach(var i in model)
            {
                if (i.active_mode == "1" && i.id.HasValue) // update
                {                    
                    var existingEntity = await _repository.GetAsync(i.id.Value);
                    if (existingEntity != null)
                    {
                existingEntity.repairId = i.repairId;
                existingEntity.amountEA = i.amountEA;
                existingEntity.documentCode = i.documentCode;
                existingEntity.paymentMethod = i.paymentMethod;
                existingEntity.exchangeItems = i.exchangeItems;
                existingEntity.paymentDate = i.paymentDate;
                existingEntity.paymentNote = i.paymentNote;


                        await _repository.UpdateWithoutCommitAsync(i.id.Value, existingEntity);
                    }
                }
                else if (i.active_mode == "1" && !i.id.HasValue) // add
                {
                    var entity = GetEntity(i);
                    entity.id = Guid.NewGuid();
                    await _repository.InsertWithoutCommitAsync(entity);
                }
                else if (i.active_mode == "0" && i.id.HasValue) // remove
                {                    
                    await _repository.DeleteWithoutCommitAsync(i.id.Value);
                }
                else if (i.active_mode == "0" && !i.id.HasValue)
                {
                    // nothing to do
                }                
            }
            if (is_force_save)
            {
                await _dataContext.SaveChangesAsync();
            } 

            return model.Count;
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);

            return;
        }

		public async Task RefreshAutoFieldOfAllDataAsync()
        {
            var all_items = _dataContext.Payments;
            foreach (var item in all_items)
            {
                
            }
            await _dataContext.SaveChangesAsync();
        }

        #endregion

        #region Match Item

        #endregion

        #endregion

        public async Task<byte[]> GetReportStreamAsync(PaymentReportRequestModel model)
        {
            using (var httpclient = new HttpClient())
            {
                string mainurl = MyHelper.GetConfig(_configuration, "JasperReportServer:MainURL");
                string reportsite = MyHelper.GetConfig(_configuration, "JasperReportServer:reportsite");
                string username = MyHelper.GetConfig(_configuration, "JasperReportServer:username");
                string password = MyHelper.GetConfig(_configuration, "JasperReportServer:password");

                string url = $"{mainurl}{reportsite}/xxใส่ชื่อรายงานตรงนี้xx.{model.filetype}?{MyHelper.GetParameterForJasperReport(model)}&j_username={username}&j_password={password}";

                if (model.filetype == "xlsx")
                {
                    url += "&ignorePagination=true";
                }

                using (var data = await httpclient.GetAsync(url))
                using (var content = data.Content)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        var stream = await content.ReadAsStreamAsync();
                        stream.CopyTo(memoryStream);
                        return memoryStream.ToArray();
                    }
                }
                
            }
        }

    }
}