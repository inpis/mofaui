/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your InsuranceViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','appController', 'ojs/ojknockout', 'promise', 'ojs/ojtable','ojs/ojselectcombobox','ojs/ojcheckboxset', 'ojs/ojarraytabledatasource', 'ojs/ojarraydataprovider','ojs/ojdatetimepicker','ojs/ojtimezonedata', 'ojs/ojdialog','ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource'],
 function(oj, ko, $, app) {
  
    function InsuranceViewModel() {
		var self = this;
		self.errormessage = ko.observable("");
		self.itemKey = ko.observable("");
		self.notification = ko.observable();
		self.notification(oj.Translations.getTranslatedString('dashboard.notification'));
		self.insuranceTitle = ko.observable();
		self.insuranceTitle(oj.Translations.getTranslatedString('insurance.medicalinsurance'));
		self.grievanceTitle = ko.observable();
		self.grievanceTitle(oj.Translations.getTranslatedString('insurance.insuranceGrievance'));
		self.reimbursementTitle = ko.observable();
		self.reimbursementTitle(oj.Translations.getTranslatedString('insurance.expenseReimbursment'));
		self.approveEmpInsuranceTitle = ko.observable();
		self.approveEmpInsuranceTitle(oj.Translations.getTranslatedString('insurance.approveInsurance'));
		self.policyNoLable = ko.observable();
		self.policyNoLable(oj.Translations.getTranslatedString('insurance.policyno'));
		self.serviceProLable = ko.observable();
		self.serviceProLable(oj.Translations.getTranslatedString('insurance.serviceprovider'));
		self.claimLable = ko.observable();
		self.claimLable(oj.Translations.getTranslatedString('insurance.claimref'));
		self.claimDateLable = ko.observable();
		self.claimDateLable(oj.Translations.getTranslatedString('insurance.dateofclaim'));
		self.amountLable = ko.observable();
		self.amountLable(oj.Translations.getTranslatedString('insurance.amount'));
		self.currencyLable = ko.observable();
		self.currencyLable(oj.Translations.getTranslatedString('insurance.currency'));
		self.remarkLable = ko.observable();
		self.remarkLable(oj.Translations.getTranslatedString('insurance.remarks'));
		self.btnnext = ko.observable();
		self.btnnext(oj.Translations.getTranslatedString('leave.btnnext'));	
		self.totalexplabel = ko.observable();
		self.totalexplabel(oj.Translations.getTranslatedString('insurance.totalexp'));
		self.amountreimlabel = ko.observable();
		self.amountreimlabel(oj.Translations.getTranslatedString('insurance.amountreim'));
		self.amountforreimlabel = ko.observable();
		self.amountforreimlabel(oj.Translations.getTranslatedString('insurance.amountforreim'));
		self.remarkLable = ko.observable();
		self.remarkLable(oj.Translations.getTranslatedString('insurance.remarks'));
		self.btnadd = ko.observable();
		self.btnadd(oj.Translations.getTranslatedString('insurance.add'));		  
		
		//grid approval employee column1
		self.medinsurance = ko.observable(oj.Translations.getTranslatedString('insurance.medinsurance'));
		self.persontype = ko.observable(oj.Translations.getTranslatedString('insurance.persontype'));
		self.depref = ko.observable(oj.Translations.getTranslatedString('insurance.depref'));
		self.empno = ko.observable(oj.Translations.getTranslatedString('insurance.empno'));
		self.name = ko.observable(oj.Translations.getTranslatedString('insurance.name'));
		self.arabicname = ko.observable(oj.Translations.getTranslatedString('insurance.arabicname'));
		self.dob = ko.observable(oj.Translations.getTranslatedString('insurance.dob'));
		self.nationalid = ko.observable(oj.Translations.getTranslatedString('insurance.nationalid'));
		self.phone = ko.observable(oj.Translations.getTranslatedString('insurance.phone'));
		self.city = ko.observable(oj.Translations.getTranslatedString('insurance.city'));
		self.datecover = ko.observable(oj.Translations.getTranslatedString('insurance.datecover'));
		self.job = ko.observable(oj.Translations.getTranslatedString('insurance.job'));
		self.serviceprovider = ko.observable(oj.Translations.getTranslatedString('insurance.serviceprovider'));
		self.document = ko.observable(oj.Translations.getTranslatedString('insurance.document'));
		self.approveddate = ko.observable(oj.Translations.getTranslatedString('insurance.approveddate'));
		self.action = ko.observable(oj.Translations.getTranslatedString('insurance.action'));
		self.reason = ko.observable(oj.Translations.getTranslatedString('insurance.reason'));
		self.status = ko.observable(oj.Translations.getTranslatedString('insurance.status'));

		self.claimRefNum = ko.observable();
		self.policyNum = ko.observable();
		self.serviceProviderVal = ko.observable();
		self.claimDateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
		self.expireDateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
		self.amount = ko.observable();
		self.currency = ko.observable();
		self.remarks = ko.observable();
		self.ReimbursRemarks = ko.observable();
		self.approver = ko.observable();
		self.approver(oj.Translations.getTranslatedString('insurance.approver'));
		self.totalexpval = ko.observable();
		self.amountreimval = ko.observable();
		self.amountforreimval = ko.observable();
		self.claim_date_val2 = ko.observable("");
		self.totalExpense = ko.observable();
		self.InsuReimbAmount = ko.observable();
		self.ReimbAmount = ko.observable();
		self.btnsubmit = ko.observable();
		self.btnsubmit(oj.Translations.getTranslatedString('leave.btnsubmit'));	
		self.btnback = ko.observable();
		self.btnback(oj.Translations.getTranslatedString('leave.btnback'));	
		self.personEADError = ko.observableArray([]);
	  
		var restWebUrl = localStorage.getItem('restURL');

		self.policyNo = ko.observableArray([
			{value: '', label: ''}
		]);
		self.serviceProviderList = ko.observableArray([
			{value: '', label: ''}
		]);
		self.currencyList = ko.observableArray([
			{value: '', label: ''}
		]);
		self.empApproveDataProvider = new oj.ArrayDataProvider(app.approvers, {idAttribute: 'approver_order_number'});

		self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
	    createConverter(
		{
		  pattern : 'dd-MMM-yyyy'
		}));
		
        
		
		self.approvercolumnarray = [{"headerText": oj.Translations.getTranslatedString('leave.lineno'), 
									"field": "approver_order_number"},
									{"headerText": oj.Translations.getTranslatedString('leave.approver'), 
									"field": "display_name"},
									{"headerText": oj.Translations.getTranslatedString('leave.category'), 
									"field": "approver_category"}];
      
      
		self.empInsurancedatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(app.empInsuranceArray, {idAttribute: 'PersonType'}));
		self.empInsuranceColumnArray = [{"headerText": oj.Translations.getTranslatedString('insurance.select'),
                      "renderer": oj.KnockoutTemplateUtils.getRenderer("checkbox_tmpl", true),
                       "id": "column1"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.persontype'),
                       "field": "PersonType",
                       "id": "column2"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.empno'),
                       "field": "EmpNo",
                       "id": "column3"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.name'),
                       "field": "NameEN",
                       "id": "column4"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.arabicname'),
                       "field": "NameAR",
                       "id": "column5"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.job'),
                        "field": "JobName",
                        "id": "column6"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.dob'),
                        "field": "DOB",
                        "id": "column7"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.idno'),
                        "field": "PersonId",
                        "id": "column8"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.phone'),
                        "field": "PhoneNo",
                        "id": "column9"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.city'),
                      "field": "City",
                      "id": "column10"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.datecover'),
                      "field": "DateCover",
                      "id": "column10"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.gender'),
                      "field": "Gender",
                      "id": "column11"},
                      {"headerText": oj.Translations.getTranslatedString('insurance.status'),
                      "field": "InsuranceStatus",
                      "id": "column12"}];
						
		// Mod: Ajay Starts
		var apprEmpInsuranceArray = [
			{ Selected: [], PersonId: '00', EmpPersonId: '0', MediInsId: '32535-52523', PersonType: '-', EmpDepRefNum: '24324-43', EmpNum: 34323, NameEN: 'Iyaad Al Akhtar', NameAR: '-', DOB: '2018-03-21', NationalId: 7665778, PhoneNum: '-', City: '-', DateCover: '2018-03-21', JobName: '-', ServicePro: '', DocNum: '', ExpDate: '2018-03-21', ActionStatus: '', Reason: '', InsStatus: 'Active', ApprovedDate: '2018-03-21' }];

		self.apprEmpInsuranceArrayObservables = apprEmpInsuranceArray.map(function (row) {
			Object.keys(row).forEach(function (attr) {
				row[attr] = ko.observable(row[attr]);
			});
			return row;
		});

		self.approveEmpInsuranceArray = ko.observableArray(apprEmpInsuranceArray);

		self.Selected = ko.observable(false);
		self.selectedEmployees = ko.computed(function () {
			return self.approveEmpInsuranceArray().filter(function (item) {
				return item.Selected();
			});
		});

		self.toggleAssociation = function (item) {
			console.log(item.Selected());
			if (!(item.Selected())) {
				$.each(self.approveEmpInsuranceArray(), function (k, v) {
					if (item.EmpPersonId == v.EmpPersonId) {
						console.log("item" + item.EmpPersonId);
						self.approveEmpInsuranceArray()[k].Selected(true);
					}
				});
			} else {
				$.each(self.approveEmpInsuranceArray(), function (k, v) {
					if (item.EmpPersonId == v.EmpPersonId) {
						console.log("item" + item.EmpPersonId);
						self.approveEmpInsuranceArray()[k].Selected(false);
					}
				});
			}
			return true;
		};

		//get value in Text Box For Document No
		self.getValService = function (item) {
			console.log(item.Selected());
			var serviceVal = '';
			var pID = '';
			$.each(self.approveEmpInsuranceArray(), function (k, v) {
				if (item.MediInsId == v.MediInsId) {
					$('#apprEmpMedicalIns').find('tr').each(function () {
						var row = $(this);
						var insId = $(this).find("td").eq(1).html();
						if (item.MediInsId == insId) {
							serviceVal = row.find('input.ServicePro').val();
							pID = $(this).find("td").eq(4).html();;
						}
					});
				}
			});
			$('#apprEmpMedicalIns').find('tr').each(function () {
				var row = $(this);
				//console.log(JSON.stringify(row));
				var v = $(this).find("td").eq(3).html(); //.split('-')[0];
				console.log(v);
				if (v) {
					if (v.split('-')[0] == pID) {
						row.find('input.ServicePro').val(serviceVal)
					}
				}
			});
		}

		//get value in Text Box For Document No
		self.getValDoc = function (item) {
			console.log(item.Selected());
			var Val = '';
			var pID = '';
			$.each(self.approveEmpInsuranceArray(), function (k, v) {
				if (item.MediInsId == v.MediInsId) {
					$('#apprEmpMedicalIns').find('tr').each(function () {
						var row = $(this);
						var insId = $(this).find("td").eq(1).html();
						if (item.MediInsId == insId) {
							Val = row.find('input.DocNum').val();
							pID = $(this).find("td").eq(4).html();;
						}
					});
				}
			});
			$('#apprEmpMedicalIns').find('tr').each(function () {
				var row = $(this);
				//console.log(JSON.stringify(row));
				var v = $(this).find("td").eq(3).html(); //.split('-')[0];
				console.log(v);
				if (v) {
					if (v.split('-')[0] == pID) {
						row.find('input.DocNum').val(Val)
					}
				}
			});
		}

		self.getApproval = function (item) {
			console.log(item.Selected());
			var Val = '';
			var pID = '';
			$.each(self.approveEmpInsuranceArray(), function (k, v) {
				if (item.MediInsId == v.MediInsId) {
					$('#apprEmpMedicalIns').find('tr').each(function () {
						var row = $(this);
						var insId = $(this).find("td").eq(1).html();
						if (item.MediInsId == insId) {
							Val = row.find('select').val();;
							pID = $(this).find("td").eq(4).html();;
						}
					});
				}
			});
			$('#apprEmpMedicalIns').find('tr').each(function () {
				var row = $(this);
				//console.log(JSON.stringify(row));
				var v = $(this).find("td").eq(3).html(); //.split('-')[0];
				var emp = $(this).find("td").eq(4).html();
				console.log(v);
				if (v) {
					if (v.split('-')[0] == pID && !emp) {
						//row.find('select').val(Val);
						$(this).find("td").eq(16).html(Val);
					}
				}
			});
		}

		self.getRegion = function (item) {
			console.log(item.Selected());
			var Val = '';
			var pID = '';
			$.each(self.approveEmpInsuranceArray(), function (k, v) {
				if (item.MediInsId == v.MediInsId) {
					$('#apprEmpMedicalIns').find('tr').each(function () {
						var row = $(this);
						var insId = $(this).find("td").eq(1).html();
						if (item.MediInsId == insId) {
							Val = row.find('input.approveRegion').val();;
							pID = $(this).find("td").eq(4).html();;
						}
					});
				}
			});
			$('#apprEmpMedicalIns').find('tr').each(function () {
				var row = $(this);
				//console.log(JSON.stringify(row));
				var v = $(this).find("td").eq(3).html(); //.split('-')[0];
				console.log(v);
				if (v) {
					if (v.split('-')[0] == pID) {
						row.find('input.approveRegion').val(Val);
					}
				}
			});
		}
		// Mod: Ajay Ends

		self.approveEmpInsurancedatasource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.approveEmpInsuranceArray, {idAttribute: 'MediInsId'}));
		self.approveEmpInsurancecolumnArray = [
                     
					  { "headerText": oj.Translations.getTranslatedString('insurance.medinsurance'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "MediInsId"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.persontype'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "PersonType"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.depref'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "EmpDepRefNum"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.empno'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "EmpNum"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.name'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "NameEn"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.arabicname'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "NameAR"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.dob'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "DOB"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.nationalid'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "NationalId"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.phone'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "PhoneNum"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.city'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "city"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.datecover'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "DateCover"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.job'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "JobName"},
                     { "headerText": oj.Translations.getTranslatedString('insurance.serviceprovider'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end",
					    "sortProperty": "ServicePro"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.document'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end",
					    "sortProperty": "DocNum"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.approveddate'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end",
					    "sortProperty": "ApprovedDate"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.action'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end",
					    "sortProperty": "ActionStatus"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.reason'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "Reason"},
                      { "headerText": oj.Translations.getTranslatedString('insurance.status'),
					    "headerStyle": "min-width: 8em; max-width: 8em; width: 8em",
					    "headerClassName": "oj-helper-text-align-end",
					    "style": "min-width: 8em; max-width: 8em; width: 8em",
					    "className": "oj-helper-text-align-end oj-read-only",
					    "sortProperty": "InsStatus"}];
	 
		// function to determine which renderer to use for 
		// rendering depending on mode
		self._editRowRenderer = oj.KnockoutTemplateUtils.getRenderer('editRowTemplate', true);
		self._navRowRenderer = oj.KnockoutTemplateUtils.getRenderer('rowTemplate', true);
		self.rowRenderer = function(context)
		{
			var mode = context['rowContext']['mode'];
			var renderer;
			
			if (mode === 'edit')
			{
				self._editRowRenderer(context);
			}
			else if (mode === 'navigation')
			{
				self._navRowRenderer(context);
			}
		};
		
		var grievanceDataArray = [{Status: '-', PolicyNum: '-', ServicePro: '-', ClaimRefNum: '-',Amount:'-',Remarks:"-",addressed:"-",approRemark:"-"}];
		self.grievanceObservableArray = ko.observableArray(grievanceDataArray);
		self.grivancedataprovider = new oj.ArrayDataProvider(self.grievanceObservableArray, {idAttribute: ['ClaimRefNum','PolicyNum']});

		//var empApproveGrievanceArray = [{lineno: 1, approver: 'Abdus Samad al Siddique', category: 'Approver'}];
		self.empApproveGrievanceDataProvider = new oj.ArrayDataProvider(app.approvers, {idAttribute: 'approver_order_number'});

		self.empgrivanceColumnArray = [//{"headerText": oj.Translations.getTranslatedString('insurance.status'), 
									   //		"field": "Status"},
											{"headerText": oj.Translations.getTranslatedString('insurance.policyno'), 
											"field": "PolicyNum"},
											{"headerText": oj.Translations.getTranslatedString('insurance.serviceprovider'), 
											"field": "ServicePro"},
											{"headerText": oj.Translations.getTranslatedString('insurance.claimref'), 
											"field": "ClaimRefNum"},
											{"headerText": oj.Translations.getTranslatedString('insurance.amount'), 
											"field": "Amount"},
											{"headerText": oj.Translations.getTranslatedString('insurance.remarks'), 
											"field": "Remarks"},
											{"headerText": oj.Translations.getTranslatedString('insurance.addressed'), 
											"field": "Addressed"},
											{"headerText": oj.Translations.getTranslatedString('insurance.approverremarks'), 
												"field": "ApproverRemarks"}]
	  

		var reimbursementDataArray = [{Status: '-', PolicyNum: '-', ServicePro: '-', DateOfClaim: '2018-03-21',TotalExpense:'-',AmtRmbByIns:"-",AmtForRmb:"-",Currency:"-",Remarks:"-"}];
        self.reimbursementObservableArray = ko.observableArray(reimbursementDataArray);
        self.reimbursementdataprovider = new oj.ArrayDataProvider(self.reimbursementObservableArray, {idAttribute: ['ClaimRefNum','PolicyNum']});

		var empApproveReimbursementArray = [{lineno: 1, approver: 'Abdus Samad al Siddique', category: 'Approver'}];
		self.empApproveReimbursementDataProvider = new oj.ArrayDataProvider(empApproveReimbursementArray, {idAttribute: 'lineno'});

		self.empReimbursementColumnArray = [//{"headerText": oj.Translations.getTranslatedString('insurance.status'), "field": "Status"},
											{"headerText": oj.Translations.getTranslatedString('insurance.policyno'), 
											"field": "PolicyNum"},
											{"headerText": oj.Translations.getTranslatedString('insurance.serviceprovider'), 
											"field": "ServicePro"},
											{"headerText": oj.Translations.getTranslatedString('insurance.dateofclaim'), 
											"field": "DateOfClaim"},
											{"headerText": oj.Translations.getTranslatedString('insurance.totalexp'), 
											"field": "TotalExpense"},
											{"headerText": oj.Translations.getTranslatedString('insurance.amountreim'), 
											"field": "AmtRmbByIns"},
											{"headerText": oj.Translations.getTranslatedString('insurance.amountforreim'), 
											"field": "AmtForRmb"},
											{"headerText": oj.Translations.getTranslatedString('insurance.currency'), 
											"field": "Currency"},
											{"headerText": oj.Translations.getTranslatedString('insurance.remarks'), 
											"field": "Remarks"}]
      

      self.insuranceData =  function() {
		localStorage.setItem('state','ins_init');
        $('.insuranceUpperContainer,.grivanceContainer,.reimbursementContainer,.approveEmpMedicalInsuContainer').hide();
        $('.insuranceLowerContainer ,.medicalInsuContainer').show();
		
		$('#insErrorList').empty();
        if (self.personEADError().length > 0) {
          $.each(self.personEADError(), function (key, value) {
            $("#insErrorList").append("<li></li>").append("<i>" + value + "</i>");
          });
          document.querySelector('#errorDialog').open();
        }
      }

      self.grievanceData =  function() {
		localStorage.setItem('state','ins_gri');  
        $('.insuranceUpperContainer,.medicalInsuContainer,.reimbursementContainer,.approveEmpMedicalInsuContainer').hide();
        $('.insuranceLowerContainer ,.grivanceContainer').show();
      }

      self.reimbursementData =  function() {
		localStorage.setItem('state','ins_reim');
	    $('.insuranceUpperContainer,.medicalInsuContainer,.grivanceContainer,.approveEmpMedicalInsuContainer').hide();
        $('.insuranceLowerContainer ,.reimbursementContainer').show();
      }
      self.approveEmpMedicalInsuranceData =  function() {
		localStorage.setItem('state','ins_app');
        $('.insuranceUpperContainer,.medicalInsuContainer,.grivanceContainer,.reimbursementContainer').hide();
        $('.insuranceLowerContainer ,.approveEmpMedicalInsuContainer').show();
      }



      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.
	   
	  self.notificationdataprovider = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(app.notifications,  {keys: app.notifications().map(function(value) { return value.NotificationId; })}));	  	

	  var empInsTable;	  
	  var appEmpInsTable;

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
        //document.querySelector('#applyMedicalInsuranceModal').open();
        
        $(function(){
			$('#globalBody').removeClass('loginBody');
			$('.header,footer').show();
			
            $('.insuranceLowerContainer').hide();
            $( ".insuranceBackArrow" ).on('click',function() {
				if (empInsTable)
				{
					empInsTable.selection = [];
				}
				$('.insuranceLowerContainer').hide();
				$('.insuranceUpperContainer').show();
            });
			
			self.reloadlanguage();
			
			//reload data
			self.reloaddata();
        });

      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };

      self.addGrievanceData = function() {
		self.clearData();
        document.querySelector('#applyMedicalGrivanceModal').open();  
		$("#service-provider").prop("disabled", true);
      };
	  
	  self.addReimbursementData = function() {
		self.clearData();
        document.querySelector('#applyMedicalReimbursmentModal').open();
        $("#Reimb-service-provider").prop("disabled", true);
      };

	  //Function TO Check All Details of Person are present

      self.getEADError = function (emppersonid, personid) {
        var restWebUrl = localStorage.getItem('restURL');
        var settings =
          {
            "async": true,
            "crossDomain": true,
            "url": restWebUrl + "/IEMIns/validation",
            "method": "POST",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
              "Cache-Control": "no-cache",
            },
            "data": {
              "emppersonid": emppersonid,
              "personid": personid
            }
          }
        $.ajax(settings).done(function (response) {
          console.log(response.Validation[0].Error);
          if (response.Validation[0].Error) {
            console.log(response);
            self.personEADError.push(response.Validation[0].Error);
          }
        }).fail(function (xhr, status, error) {
          console.error(error);
        });
      }
	  
	  self.loadInitEmp = function ()
	  {
			
		document.querySelector('#loader').open();
		//Load Initiate Employee
		$.ajax({
		  url         : restWebUrl+"/IEMIns/EADDetails",
		  method      : "post",
		  crossDomain : "true",
		  headers     : {
			"content-type": "application/x-www-form-urlencoded" 
		  },
		  data        : {
			"personid": app.personid()
		  }
		}).done(function(response) {
			if (response.EADDetails[0].Error) {
				//self.errormessage(response.Error);
				//document.querySelector('#messageDialog').close();
				app.empInsuranceArray([]);
				console.log("Error load initiate employee : " + response.EADDetails[0].Error);
			}
			else
			{
				for (var i = 0; i < response.EADDetails.length; i++){
				  response.EADDetails[i].Selected = ko.observable([]);
				  self.getEADError(app.personid(),response.EADDetails[i].PersonId);
				}  
				app.empInsuranceArray(response.EADDetails);
			}
			//console.log(app.empInsuranceArray());
			document.querySelector('#loader').close();
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //self.errormessage("Couldn't load notification due to " + error);
		  //document.querySelector('#messageDialog').open();
		  //alert("Couldn't load notification, Please try again after some time");
		  console.error(error);
		});
	  }
	  
	  self.loadApproveEmpIns = function ()
	  {
		//Load for first time only
		document.querySelector('#loader').open();
		//Load Initiate Employee
		$.ajax({
		  url         : restWebUrl+"/AEMIns/AEMIDetails",
		  method      : "get",
		  crossDomain : "true",
		  headers     : {
			
		  },
		  data        : {
			"personid": app.personid()
		  }
		}).done(function(response) {
			if (response.AEMIDetails[0].Error) {
				//self.errormessage(response.Error);
				//document.querySelector('#messageDialog').close();
				self.approveEmpInsuranceArray([]);
				console.log("Error load approve employee : " + response.AEMIDetails[0].Error);
			}
			else
			{
				for (var i = 0; i < response.AEMIDetails.length; i++){
				  response.AEMIDetails[i].Selected = ko.observable(false);
				}  
				console.log(response.AEMIDetails);
				self.approveEmpInsuranceArray(response.AEMIDetails);
			}
			//console.log(app.empInsuranceArray());
			document.querySelector('#loader').close();
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //self.errormessage("Couldn't load notification due to " + error);
		  //document.querySelector('#messageDialog').open();
		  //alert("Couldn't load notification, Please try again after some time");
		  console.error(error);
		});
	  }
	  
	  self.loadGrievance = function ()
	  {
			
		document.querySelector('#loader').open();
		//Load Grievance
		$.ajax({
		  url         : restWebUrl+"/MIG/details",
		  method      : "post",
		  crossDomain : "true",
		  headers     : {
			"content-type": "application/x-www-form-urlencoded" 
		  },
		  data        : {
			"personid": app.personid()
		  }
		}).done(function(response) {
			if (response.GrievanceDetails[0].Error) {
				//self.errormessage(response.Error);
				//document.querySelector('#messageDialog').close();
				self.grievanceObservableArray([]);
				console.log("Error load grievance employee : " + response.GrievanceDetails[0].Error);
			}
			else
			{
				self.grievanceObservableArray(response.GrievanceDetails);
			}
			//console.log(app.empInsuranceArray());
			document.querySelector('#loader').close();
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //self.errormessage("Couldn't load notification due to " + error);
		  //document.querySelector('#messageDialog').open();
		  //alert("Couldn't load notification, Please try again after some time");
		  console.error(error);
		});
	  }
	  
	  self.loadReimbursement = function ()
	  {
		document.querySelector('#loader').open();
		//Load Grievance
		$.ajax({
		  url         : restWebUrl+"/MIR/details",
		  method      : "post",
		  crossDomain : "true",
		  headers     : {
			"content-type": "application/x-www-form-urlencoded" 
		  },
		  data        : {
			"personid": app.personid()
		  }
		}).done(function(response) {
			if (response.ReimbursementDetails[0].Error) {
				//self.errormessage(response.Error);
				//document.querySelector('#messageDialog').close();
				self.reimbursementObservableArray([]);
				console.log("Error load reimbursement employee : " + response.ReimbursementDetails[0].Error);
			}
			else
			{
				//console.log(response.ReimbursementDetails);
				self.reimbursementObservableArray(response.ReimbursementDetails);
			}
			//console.log(app.empInsuranceArray());
			document.querySelector('#loader').close();
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //self.errormessage("Couldn't load notification due to " + error);
		  //document.querySelector('#messageDialog').open();
		  //alert("Couldn't load notification, Please try again after some time");
		  console.error(error);
		});
	  }

	  self.loadMaster = function ()
	  {
		  document.querySelector('#loader').open();
		  //Policy No. List
		  $.ajax({
			url         : restWebUrl+"/EIT/policyNo",
			method      : "post",
			crossDomain : "true",
			headers     : {
			"content-type": "application/x-www-form-urlencoded" 
			},
			data        : {
				"personid": app.personid()
		
			}
		  }).done(function(response) {
				//console.log(response.PolicyNo[0]);
				if(response.PolicyNo[0].Error){
					self.policyNo = ko.observableArray([{value: '', label: ''}]);
					//$("#policy-number").prop("disabled", true);
				}else{
					self.policyNo([{value: '', label: ''}]);
					$.each(response.PolicyNo, function (index, item) {
						self.policyNo.push({ value: item.DocumentNumber, label: item.DocumentNumber });
					});
				}
			
			// currency List
			$.ajax({
			  async       : "true",
			  url         : restWebUrl+"/EIT/currency",
			  method      : "GET",
			  crossDomain : "true",
			  headers     : {},
			}).done(function(response) {
				if(response.Currency[0].Error){
					self.currencyList = ko.observableArray([{value: '', label: ''}]);
				}else{
					self.currencyList([{value: '', label: ''}]);
					$.each(response.Currency, function (index, item) {
						self.currencyList.push({ value: item.Code, label: item.Code });
					});
				}
			  document.querySelector('#loader').close();

			}).fail(function(xhr, status, error) {
			  console.error(error);
			  document.querySelector('#loader').close();
			});

			
		  }).fail(function(xhr, status, error) {
			console.error(error);
			document.querySelector('#loader').close();
		  });
	  }
	  
	  self.reloaddata = function ()
	  {
			document.querySelector('#loader').open();
			//$.ajaxSetup({async: false});
			
			app.username(localStorage.getItem('username'));
			app.employeetype(localStorage.getItem('emptype'));
			app.personid(localStorage.getItem('personid'));
			app.businessgroupid(localStorage.getItem('businessgroupid'));
			app.businessgroupname(localStorage.getItem('businessgroup'));
			app.lastname(localStorage.getItem('lastname'));
			app.emailaddress(localStorage.getItem('email')); 
			app.employeenumber(localStorage.getItem('employeeid')); 
			app.firstname(localStorage.getItem('firstname')); 
			app.fullname(localStorage.getItem('fullname')); 
			app.gradename(localStorage.getItem('gradename'));
			app.jobname(localStorage.getItem('jobname'));
			app.positionname(localStorage.getItem('positionname'));
			app.locationcode(localStorage.getItem('locationname')); 
			app.assigmentcategory(localStorage.getItem('assignmentcategory'));
			app.assigmentid(localStorage.getItem('assignmentid'));
			
			$('#insErrorList').empty();

			self.loadMaster();	
			self.loadInitEmp();
			self.loadApproveEmpIns();
			self.loadGrievance();
			self.loadReimbursement();
			
			//Get Notification 
			$.ajax({
			  url         : restWebUrl+"/CommonAPI/notifications",
			  method      : "post",
			  crossDomain : "true",
			  headers     : {
			  "content-type": "application/x-www-form-urlencoded" 
			  },
			  data        : {
				"username": app.username()
			  }
			}).done(function(response) {
				if (response.Notification[0].Error) {
					//self.errormessage(response.Error);
					//document.querySelector('#messageDialog').close();
					app.notifications([]);
					console.log("Error load Notification : " + response.Notification[0].Error);
				}
				else
				{
					app.notifications(response.Notification);
				}
				
			})
			.fail(function(xhr, status, error) {
			  document.querySelector('#loader').close();
			  //self.errormessage("Couldn't load notification due to " + error);
			  //document.querySelector('#messageDialog').open();
			  //alert("Couldn't load notification, Please try again after some time");
			  console.error(error);
			});
			
			if (localStorage.getItem('state') + '' == 'ins_init')
			{
				self.insuranceData();
			}
			else if (localStorage.getItem('state') + '' == 'ins_gri')
			{
				self.grievanceData();
			}
			else if (localStorage.getItem('state') + '' == 'ins_reim')
			{
				self.reimbursementData();
			}
			else if (localStorage.getItem('state') + '' == 'ins_app')
			{
				self.approveEmpMedicalInsuranceData();
			}
			
			//$.ajaxSetup({async: true});
			document.querySelector('#loader').close();
	  }

      self.serviceProviderData = ko.observable();
	    self.logMsg = ko.computed(function() {
          var data = self.serviceProviderData();
          if (data) {
            var valueObj = {};
            valueObj.value = data.value;
            //valueObj.previousValue = data.previousValue;
            //console.log(valueObj.previousValue);
		   //Service Provider List
            if(valueObj.value !== "" && valueObj.value){
              $.ajax({
                url         : restWebUrl+"/EIT/serviceProvider",
                method      : "post",
                crossDomain : "true",
                headers     : {
                "content-type": "application/x-www-form-urlencoded" 
                },
                data        : {
                "docnumber": valueObj.value
            
                }
              }).done(function(response) {
                $("#service-provider").prop("disabled", false);
				self.serviceProviderList([{value: '', label: ''}]);
	            $.each(response.ServiceProvider, function (index, item) {
                  self.serviceProviderList.push({ value: item.ServiceProvider, label: item.ServiceProvider });
                });
  
              }).fail(function(xhr, status, error) {
                console.log(error);
              });
          }
          return JSON.stringify(valueObj);
          }
        });
		
        self.valueChangedHandler = function (event) {
			self.serviceProviderData(event['detail']);
        }
		
        // Save Grievance Data
        self.nextGrievance = function() {
		  
		  // Here we check null value and show error to fill
          if (self.policyNum() == '' || !self.policyNum())
		  {
			  document.getElementById('policy-number').showMessages();
			  return;
		  }
		  
		  if (self.serviceProviderVal() == '' || !self.serviceProviderVal())
		  {
			  document.getElementById('service-provider').showMessages();
			  return;
		  }

		  if (self.claimRefNum() == '' || !self.claimRefNum())
		  {
			  document.getElementById('claim').showMessages();
			  return;
		  }
		  
		  if (self.amount() == '' || self.amount() == 0 || !self.amount())
		  {
			  document.getElementById('amount').showMessages();
			  return;
		  }
			
		  if (self.currency() == '' || !self.currency())
		  {
			  document.getElementById('currency').showMessages();
			  return;
		  }
		  
		  if (self.remarks() == '' || !self.remarks())
		  {
			  document.getElementById('remark').showMessages();
			  return;
		  }	
			
		  //var claimDateConvert = self.claimDateValue().split("-").reverse().join("-");
		  var claimDateConvert = self.dateConverter().format(self.claimDateValue());
		  //console.log(self.claimDateValue());
		  //console.log(self.dateConverter().format(self.claimDateValue()));
          $.ajax({
            url         : restWebUrl+"/MIG/next",
            method      : "post",
            crossDomain : "true",
            headers     : {
            "content-type": "application/x-www-form-urlencoded" 
            },
            data        : {
              "username": app.username,
              "policyno": self.policyNum(),
              "servicepro": self.serviceProviderVal(),
              "claimrefno": self.claimRefNum(),
              "dateclaim": claimDateConvert,
              "amount": self.amount(),
              "currency": self.currency(),
              "remark": self.remarks()

        
            }
          }).done(function(response) {
            console.log(response);
              if (response.NextButton[0].Error) {
                self.errormessage(response.NextButton[0].Error);
                document.querySelector('#messageDialog').open();
                document.querySelector('#loader').close();

              } else {
                // Successfull authentication
                var month_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                var claim_date = new Date(self.claimDateValue());
				console.log(claim_date);
                self.claim_date_val2(claim_date.getDate() + "-" + month_names[claim_date.getMonth()] + "-" + claim_date.getFullYear());
				console.log(self.claim_date_val2());
				    
                document.querySelector('#applyMedicalGrivanceModal').close();
                document.querySelector('#applyGrivanceNextModal').open();
                document.querySelector('#loader').open();
                if (response.NextButton[0].ItemKey)
                {
                  self.itemKey(response.NextButton[0].ItemKey);
                    
                  // get approver list
                  $.ajax({
                    url         : restWebUrl+"/CommonAPI/getApproverList",
                    method      : "post",
                    crossDomain : "true",
                    headers     : {
                    "content-type": "application/x-www-form-urlencoded" 
                    },
                    data        : {
						"transactionid": response.NextButton[0].TransactionId
                    }
                  }).done(function(response) {
                    if (response.Summary[0].Error)
                    {
                      app.approvers([]); 
                    }
                    else
                    {
                      app.approvers(response.Summary); 
                    }
                    document.querySelector('#loader').close();
                  })
                  .fail(function(xhr, status, error) {
                    document.querySelector('#loader').close();
                    //alert("Couldn't complete leave, Please try again after some time");
                    console.error(error);
                  });
                }
                else
                {
                  document.querySelector('#loader').close();
                }
              }
          }).fail(function(xhr, status, error) {
            console.log(error);
          });  
        
        }  
		
		self.grievanceBack =function() {
			document.querySelector('#applyGrivanceNextModal').close();
            document.querySelector('#applyMedicalGrivanceModal').open();
		}

		// Grievance Data Saved
		self.grievanceSubmit = function() {
			document.querySelector('#loader').open();  
		    //console.log(self.itemKey());
			//complete Grievance Submit
			$.ajax({
			  url         : restWebUrl+"/EIT/submit",
			  method      : "post",
			  crossDomain : "true",
			  headers     : {
			  "content-type": "application/x-www-form-urlencoded" 
			  },
			  data        : {
			  "itemkey": self.itemKey()
			  }
			}).done(function(response) {
			  if (response.SubmitButton[0].Error) {
				  console.log("Error complete grievance : " + response.SubmitButton[0].Error);
				  self.errormessage(response.SubmitButton[0].Error);
				  document.querySelector('#messageDialog').open();
			  } else {
				document.querySelector('#applyGrivanceNextModal').close();
				document.querySelector('#ConfirmationModal').open();
				self.clearData();				
			  }
			  document.querySelector('#loader').close();
			})
			.fail(function(xhr, status, error) {
			  document.querySelector('#loader').close();
			  console.error(error);
			});
        	
		}

		self.initEmpSubmit = function () {
			var element = document.getElementById('empInsuranceTable');
			var selectionObj = element.selection;
			//var empStatus=app.empInsuranceArray()[0].InsuranceStatus;
			console.log(selectionObj);
			var selectionTxt = "";
			var len = selectionObj ? selectionObj.length : 0;
			console.log('Selected Item Count: ' + JSON.stringify(selectionObj));
			var i = 0;
			// To Validate if Employee is selected
			self.errormessage('');
			var hasEmployee = false;
			var empActiveDepSelected = false;
			$.each(selectionObj, function (i, obj) {
			  console.log('Data:' + obj.startIndex.row);
			  if (obj.startIndex.row == 0) {
				hasEmployee = true;
			  }
			  else if (obj.startIndex.row > 0) {
				empActiveDepSelected = true;
			  }
			});
			// Check Employee is having Active Insurance
			var employeeIsActive = false;
			if (app.empInsuranceArray()[0].InsuranceStatus === "Active") {
			  employeeIsActive = true;
			}
			// Check Employee With Active Insurance has selected Dependents
			var empSelectedDependent = false;
			if (employeeIsActive && empActiveDepSelected) {
			  empSelectedDependent = true
			}

			var selectedDependentHasError=false;
			if(self.personEADError().length!=0){
			  selectedDependentHasError=true;
			}


			if (len !== 0 && hasEmployee && (!employeeIsActive || empActiveDepSelected) && !selectedDependentHasError) {
			  for (i = 0; i < len; i++) {
				document.querySelector('#loader').open();

				//Submit Initiate Employee
				//$.ajaxSetup({async: false});
				$.ajax({
				  url: restWebUrl + "/IEMIns/submit",
				  method: "post",
				  crossDomain: "true",
				  headers: {
					"content-type": "application/x-www-form-urlencoded"
				  },
				  data: {
					"emppersonid": app.empInsuranceArray()[selectionObj[i].startIndex.row].EmpPersonId,
					"personid": app.empInsuranceArray()[selectionObj[i].startIndex.row].PersonId
				  }
				}).done(function (response) {
				  //console.log(JSON.stringify(response));
				  document.querySelector('#loader').close();
				  if (response.Submit.Error) {
					self.errormessage(response.Submit.Error);
					document.querySelector('#messageDialog').open();
					console.log("Error submit initiate employee : " + response.Submit.Error);
				  }
				  else
				  {
					document.querySelector('#ConfirmationModal').open();
				  }  
				  
				  if (i == len -1)
				  {
					self.reloaddata();
				  }
				})
				.fail(function (xhr, status, error) {
					document.querySelector('#loader').close();
					//self.errormessage("Couldn't load notification due to " + error);
					//document.querySelector('#messageDialog').open();
					//alert("Couldn't load notification, Please try again after some time");
					console.error(error);
				});
				  
			  }
			  //$.ajaxSetup({async: true});
			} else {
			  $('#insErrorList').empty();
			  if (len==0) {
				console.log('C1 len==0');

				$("#insErrorList").append("<li></li>").append("<i>Please Select Dependents.</i>");
				document.querySelector('#errorDialog').open();

			  }else if(employeeIsActive && !empActiveDepSelected){
				console.log('C2 employeeIsActive && !empActiveDepSelected');

				$("#insErrorList").append("<li></li>").append("<i>Please Select Dependents.</i>");
				document.querySelector('#errorDialog').open();

			  } else if(!hasEmployee){
				console.log('C3 !hasEmployee');

				$("#insErrorList").append("<li></li>").append("<i>Should select Employee</i>");
				document.querySelector('#errorDialog').open();

			  }else if(selectedDependentHasError){
				console.log('C3 hasEmployee && !selectedDependentHasError')

				$.each(self.personEADError(), function (key, value) {
				  $("#insErrorList").append("<li></li>").append("<i>" + value + "</i>");
				});
				document.querySelector('#errorDialog').open();
			  }
			}
		}  
      
		self.empInsSelectionListener = function(event)
		{
			var data = event.detail;
			if (data != null)
			{
				var selectionObj = data.value;
				var totalSize = self.empInsurancedatasource.totalSize();
				var i, j;
				for (i = 0; i < totalSize; i++)
				{
					self.empInsurancedatasource.at(i).then(function(row) {
						var foundInSelection = false;
						if (selectionObj)
						{
							for (j = 0; j < selectionObj.length; j++)
							{
								var range = selectionObj[j];
								var startIndex = range.startIndex;
								var endIndex = range.endIndex;

								if (startIndex != null && startIndex.row != null)
								{
									if (row.index >= startIndex.row && row.index <= endIndex.row)
									{
										row.data.Selected(['checked']);
										foundInSelection = true;
									}
								}
							}
						}
						if (!foundInSelection)
						{
						  row.data.Selected([]);
						}
					});
				}
			}
		}
		
		self.empInsSyncCheckboxes = function(event)
		{
			event.stopPropagation();
			setTimeout(function()
			{
				// sync the checkboxes with selection obj
				var selectionObj = [];
				var totalSize = self.empInsurancedatasource.totalSize();
				var i;
				for (i = 0; i < totalSize; i++)
				{
					self.empInsurancedatasource.at(i).then(function(row) {
						if (row.data.Selected().length > 0 &&
							row.data.Selected()[0] == 'checked')
						{
							selectionObj.push({startIndex: {row: row.index}, endIndex: {row: row.index}});
						}

						if (row.index == totalSize - 1)
						{
							empInsTable.selection = selectionObj;
						}
					});
				}
			}, 0);
		}
		
		// Mod: Ajay Starts

		function datenow(dateValue) {
			var dt = new Date(dateValue);
			var month = new Array(12);
			month[0] = "JAN";
			month[1] = "FEB";
			month[2] = "MAR";
			month[3] = "APR";
			month[4] = "MAY";
			month[5] = "JUN";
			month[6] = "JUL"
			month[7] = "AUG";
			month[8] = "SEP";
			month[9] = "OCT";
			month[10] = "NOV";
			month[11] = "DEC";
			var mon = dt.getMonth();
			return dt.getDate() + "-" + month[mon] + "-" + dt.getFullYear();
		}

		self.appEmpSubmit = function () {
			if (self.selectedEmployees().length > 0) {
				var dataArray = [];

				var docError = [];
				var serviceProviderError = [];
				var expiryDateError = [];
				var actionError = [];
				var approveReasonError = [];

				console.log(JSON.stringify(self.selectedEmployees()));
				$('#apprEmpMedicalIns').find('tr').each(function () {
					var row = $(this);
					if (row.find('input[type="checkbox"]').is(':checked')) {

						var sp, dn, ed, action, pID, approveReason;
						var insId = $(this).find("td").eq(1).html();
						var insSt = $(this).find("td").eq(18).html();

						var emp = $(this).find("td").eq(4).html();

						pID = row.find('input[type="checkbox"]').val();

						console.log("insId: " + insId);
						console.log("insSt: " + insSt);
						console.log(JSON.stringify(row));
						if (!row.find('input.ServicePro').val()) {
							console.log('You Must Fill Service Provider');
						} else {
							sp = row.find('input.ServicePro').val();
							console.log(row.find('input.ServicePro').val());
						}
						if (!row.find('input.DocNum').val()) {
							console.log("You Must Fill Document Number");
						} else {
							dn = row.find('input.DocNum').val();
							console.log(row.find('input.DocNum').val());
						}

						if (!row.find('input.oj-inputdatetime-input').val()) {
							console.log('You Must Select Expiry Date');
						} else {
							ed = row.find('input.oj-inputdatetime-input').val();
						}

						if (emp) {
							if (!row.find('select').val()) {
								console.log('Select A Value');
							} else {
								action = row.find('select').val();
							}
						} else {
							action = $(this).find("td").eq(16).html();
						}
						if (emp) {
							if (row.find('select').val() === "Reject" && row.find('.approveRegion').val() == '') {
								document.querySelector('#custommessageDialog').open();
							} else {
								approveReason = row.find('.approveRegion').val();
							}
						} else {
							if ($(this).find("td").eq(16).html() === "Reject" && row.find('.approveRegion').val() == '') {
								document.querySelector('#custommessageDialog').open();
							} else {
								approveReason = row.find('.approveRegion').val();
							}
						}


						console.log("insId: " + insId);
						console.log("insSt: " + insSt);
						console.log(JSON.stringify(row));
						console.log("docnum" + dn);
						console.log("servicepro" + sp);
						console.log("expirydate" + datenow(ed))
						console.log("insstatus" + insSt);
						console.log("approveddate" + datenow(new Date()))
						console.log("mediinsid" + insId)
						console.log("personid" + pID);

						if (dn && sp && ed && action && action != 'Reject') {
							dataArray.push({
								"docnum": dn,
								"servicepro": sp,
								"expirydate": datenow(ed),
								"insstatus": action,
								"approveddate": datenow(new Date()),
								"mediinsid": insId,
								"personid": pID,
								"reason": approveReason
							});
						} else if (dn && sp && ed && action && action == 'Reject' && approveReason) {
							dataArray.push({
								"docnum": dn,
								"servicepro": sp,
								"expirydate": datenow(ed),
								"insstatus": action,
								"approveddate": datenow(new Date()),
								"mediinsid": insId,
								"personid": pID,
								"reason": approveReason
							});
						} else {
							if (!dn) {
								console.log("dn error");
								docError.push({ "error": "DocError" });
							}

							if (!sp) {
								console.log("Sp error");
								serviceProviderError.push({ "error": "serviceError" });
							}

							if (!ed) {
								console.log("Ed error");
								expiryDateError.push({ "error": "Expiry Date Error" });
							}

							if (!action) {
								console.log("Action error");
								actionError.push({ "error": "ActionError" });
							}

							if (action == 'Reject' && !approveReason) {
								approveReasonError.push({ "error": "Rejection Error" });
							}

						}

					}
				});

				//Submit Approve Employee
				console.log(JSON.stringify(dataArray));
				if (docError.length <= 0 && serviceProviderError.length <= 0 && expiryDateError.length <= 0 && actionError.length <= 0 && approveReasonError <= 0) {

					for (var i = 0; i < dataArray.length; i++) {
						document.querySelector('#loader').open();
						console.log('Data Array Value: ' + JSON.stringify(dataArray[i]));
						//$.ajaxSetup({ async: false });
						$.ajax({
							url: restWebUrl + "/AEMIns/submit",
							method: "post",
							crossDomain: "true",
							async: false,
							headers: {
								"content-type": "application/x-www-form-urlencoded"
							},
							data: {
								"docnum": dataArray[i].docnum,
								"servicepro": dataArray[i].servicepro,
								"expirydate": dataArray[i].expirydate,
								"actionstatus": dataArray[i].insstatus,
								"approveddate": dataArray[i].approveddate,
								"mediinsid": dataArray[i].mediinsid,
								"personid": dataArray[i].personid,
								"reason": dataArray[i].approveReason
							}
						}).done(function (response) {
							console.log(JSON.stringify(response));
							if (response.Submit[0].Error) {
								console.log("Error submit approve employee : " + response.Submit[0].Error);
								self.errormessage(response.Submit[0].Error);
								document.querySelector('#messageDialog').open();
							}
							//document.querySelector('#ConfirmationModal').open();
							setTimeout(function () {
								$('.insuranceLowerContainer').hide();
								$('.insuranceUpperContainer').show();
							}, 2000);
							
							if (i == dataArray.length - 1)
							{
								console.log('reloaddata');
								location.reload();
							}
							
							//self.loadInitEmp();
						})
						.fail(function (xhr, status, error) {
							document.querySelector('#loader').close();
							console.log(error);
						});
					}
				} else {
					if (docError.length > 0) {
						//alert('Please Enter Document Number For Selected Person');
						self.errormessage('Please Enter Document Number For Selected Person');
						document.querySelector('#messageDialog').open();
						return;
					}
					if (serviceProviderError.length > 0) {
						//alert('Please Enter Document Number For Selected Person');
						self.errormessage('Please Enter Service Provider For Selected Person');
						document.querySelector('#messageDialog').open();
						return;
					}

					if (expiryDateError.length > 0) {
						//alert('Please Enter Expiry Date For Selected Person');
						self.errormessage('Please Enter Expiry Date For Selected Person');
						document.querySelector('#messageDialog').open();
						return;
					}

					if (actionError.length > 0) {
						//alert('Please Select Action For Selected Person');
						self.errormessage('Please Select Action For Selected Person');
						document.querySelector('#messageDialog').open();
						return;
					} else if (actionError === "rejected" && row.find('.approveRegion').val() == '') {
						self.errormessage('Please Provide Reason for Rejection');
						document.querySelector('#custommessageDialog').open();
						return;
					} else if (approveReasonError > 0) {
						self.errormessage('Please Provide Reason for Rejection');
						document.querySelector('#custommessageDialog').open();
					}
				}
			} else {
				self.errormessage('Please Select Records For Operation');
				document.querySelector('#messageDialog').open();
			}
		}
		// Mod: Ajay Ends
		
		self.appEmpInsSelectionListener = function(event)
		{
			var data = event.detail;
			if (data != null)
			{
				var selectionObj = data.value;
				var totalSize = self.approveEmpInsurancedatasource.totalSize();
				var i, j;
				for (i = 0; i < totalSize; i++)
				{
					self.approveEmpInsurancedatasource.at(i).then(function(row) {
						var foundInSelection = false;
						if (selectionObj)
						{
							for (j = 0; j < selectionObj.length; j++)
							{
								var range = selectionObj[j];
								var startIndex = range.startIndex;
								var endIndex = range.endIndex;

								if (startIndex != null && startIndex.row != null)
								{
									if (row.index >= startIndex.row && row.index <= endIndex.row)
									{
										row.data.Selected(['checked']);
										foundInSelection = true;
									}
								}
							}
						}
						if (!foundInSelection)
						{
						  row.data.Selected([]);
						}
					});
				}
			}
		}
		
		self.appEmpInsSyncCheckboxes = function(event)
		{
			event.stopPropagation();
			setTimeout(function()
			{
				// sync the checkboxes with selection obj
				var selectionObj = [];
				var totalSize = self.approveEmpInsurancedatasource.totalSize();
				var i;
				for (i = 0; i < totalSize; i++)
				{
					self.approveEmpInsurancedatasource.at(i).then(function(row) {
						if (row.data.Selected().length > 0 && row.data.Selected()[0] == 'checked')
						{
							selectionObj.push({startIndex: {row: row.index}, endIndex: {row: row.index}});
						}

						if (row.index == totalSize - 1)
						{
							appEmpInsTable.selection = selectionObj;
						}
					});
				}
			}, 0);
		}
		
		self.clearData = function ()
		{
			self.claimRefNum('');
			self.policyNum('');
			self.serviceProviderVal('');
			self.claimDateValue(oj.IntlConverterUtils.dateToLocalIso(new Date()));
			self.expireDateValue(oj.IntlConverterUtils.dateToLocalIso(new Date()));
			self.amount(0);
			self.currency('');
			self.remarks('');
			self.approver('');
			self.totalexpval(0);
			self.totalExpense(0);
			self.InsuReimbAmount(0);
			self.amountreimval(0);
			self.ReimbAmount(0);
			self.amountforreimval(0);
			self.claim_date_val2('');
		}

		// Save Reimbursement Data
		self.nextReimbursement = function() {
		  if (self.policyNum() == '' || !self.policyNum())
		  {
			  document.getElementById('policy-number').showMessages();
			  return;
		  }
		  
		  if (self.serviceProviderVal() == '' || !self.serviceProviderVal())
		  {
			  document.getElementById('service-provider').showMessages();
			  return;
		  }

		  if (self.claimRefNum() == '' || !self.claimRefNum())
		  {
			  document.getElementById('claim').showMessages();
			  return;
		  }
		  
		  if (self.totalExpense() == '' || self.totalExpense() == '0')
		  {
			  document.getElementById('totalexp').showMessages();
			  return;
		  }
		  
		  if (self.InsuReimbAmount() == '' || self.InsuReimbAmount() == '0')
		  {
			  document.getElementById('amountreim').showMessages();
			  return;
		  }
		  
		  if (self.ReimbAmount() == '' || self.ReimbAmount() == '0')
		  {
			  document.getElementById('amountforreim').showMessages();
			  return;
		  }
			
		  if (self.currency() == '' || !self.currency())
		  {
			  document.getElementById('currency').showMessages();
			  return;
		  }		
			
          document.querySelector('#loader').open();  
          //var claimDateConvert = self.claimDateValue().split("-").reverse().join("-");
		  var claimDateConvert = self.dateConverter().format(self.claimDateValue());
		  //console.log(claimDateConvert);
		  
          $.ajax({
            url         : restWebUrl+"/MIR/next",
            method      : "post",
            crossDomain : "true",
            headers     : {
            "content-type": "application/x-www-form-urlencoded" 
            },
            data        : {
              "username": app.username(),
              "policyno": self.policyNum(),
              "servicepro": self.serviceProviderVal(),
              "claimrefno": self.claimRefNum(),
              "dateclaim": claimDateConvert,
              "totalexp": self.totalExpense(),
              "amtreimins": self.InsuReimbAmount(),
              "amtforreimIns":self.ReimbAmount(),
              "currency": self.currency(),
              "remark": self.ReimbursRemarks()

            }
          }).done(function(response) {
            console.log(response);
              if (response.NextButton[0].Error) {
                self.errormessage(response.NextButton[0].Error);
                document.querySelector('#messageDialog').open();
                document.querySelector('#loader').close();

              } else {
                // Successfull authentication
                var month_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
                var claim_date = new Date(self.claimDateValue());
                self.claim_date_val2(claim_date.getDate() + "-" + month_names[claim_date.getMonth()] + "-" + claim_date.getFullYear());
                
                document.querySelector('#applyMedicalReimbursmentModal').close();
                document.querySelector('#applyReimbursmentNextModal').open();
                document.querySelector('#loader').open();
                if (response.NextButton[0].ItemKey)
                {
                  self.itemKey(response.NextButton[0].ItemKey);
                    
                  // get approver list
                  $.ajax({
                    url         : restWebUrl+"/CommonAPI/getApproverList",
                    method      : "post",
                    crossDomain : "true",
                    headers     : {
                    "content-type": "application/x-www-form-urlencoded" 
                    },
                    data        : {
						"transactionid": response.NextButton[0].TransactionId
                    }
                  }).done(function(response) {
                    if (response.Summary[0].Error)
                    {
                      app.approvers([]); 
                    }
                    else
                    {
                      app.approvers(response.Summary); 
                    }
                    document.querySelector('#loader').close();
                  })
                  .fail(function(xhr, status, error) {
                    document.querySelector('#loader').close();
                    //alert("Couldn't complete leave, Please try again after some time");
                    console.error(error);
                  });
                }
                else
                {
                  document.querySelector('#loader').close();
                }
			}
          }).fail(function(xhr, status, error) {
            document.querySelector('#loader').close();
            console.log(error);
          });  
      }  
      // Reimbursement Data Saved
	  
	  self.reimbursementBack = function()
	  {
		  document.querySelector('#applyReimbursmentNextModal').close();
          document.querySelector('#applyMedicalReimbursmentModal').open();
	  }

      self.clickedButton = ko.observable();
      self.dataSubmit = function() {
        document.querySelector('#loader').open();  
        console.log(self.itemKey());
        
        self.clickedButton(event.currentTarget.id);        
		
        console.log(self.clickedButton());
        //complete Grievance Submit
        $.ajax({
          url         : restWebUrl+"/EIT/submit",
          method      : "post",
          crossDomain : "true",
          headers     : {
          "content-type": "application/x-www-form-urlencoded" 
          },
          data        : {
          "itemkey": self.itemKey()
          }
        }).done(function(response) {
			document.querySelector('#loader').close();
			if (response.SubmitButton[0].Error) {
				console.log("Error complete reimbursement : " + response.SubmitButton[0].Error);
				self.errormessage(response.SubmitButton[0].Error);
				document.querySelector('#messageDialog').open();
			} else {
			  
				if(self.clickedButton() === "grivanceSubmit"){
				  document.querySelector('#applyGrivanceNextModal').close();    
				}else if(self.clickedButton() === "reimbursmentSubmit"){
				  document.querySelector('#applyReimbursmentNextModal').close();
				}    
				self.reloaddata();
				document.querySelector('#ConfirmationModal').open();
				
			}
         
        })
        .fail(function(xhr, status, error) {
          document.querySelector('#loader').close();
          console.error(error);
        });
        }
		
		self.reloadlanguage = function()
		{
		  var newlang = localStorage.getItem('lang');
		  
		  if (!newlang)
		  {
			//console.log('in lang');
			newlang = app.lang();
			localStorage.setItem('lang',newlang);
		  }
		  
		  switch (newlang) {	
			case 'Arabic':
					newLang = 'ar-EG';
					app.formats(["arabic"]);
					break;
				default:
					newLang = 'en-US';
					app.formats(["english"]);
			}
			oj.Config.setLocale(newLang,
				function () {
					$('html').attr('lang', newLang);
					if (newLang === 'ar-EG') {
						$('html').attr('dir', 'rtl');
						
						app.leavetab(oj.Translations.getTranslatedString('dashboard.leavetab')); 
						app.instab(oj.Translations.getTranslatedString('dashboard.instab')); 
						app.dashboardtab(oj.Translations.getTranslatedString('dashboard.dashboardtab')); 
						
						var navData = [
						  {name: app.dashboardtab(), id: 'dashboard',
						   iconClass: ''},
						  {name: app.instab(), id: 'insurance',
						   iconClass: ''},
						  {name: app.leavetab(), id: 'leaves',
						   iconClass: ''},
						 
						];
						
						app.navs(navData);
						
					} else {
						$('html').attr('dir', 'ltr');
					}
					  
					self.notification(oj.Translations.getTranslatedString('dashboard.notification'));
					self.insuranceTitle(oj.Translations.getTranslatedString('insurance.medicalinsurance'));
					self.grievanceTitle(oj.Translations.getTranslatedString('insurance.insuranceGrievance'));
					self.reimbursementTitle(oj.Translations.getTranslatedString('insurance.expenseReimbursment'));
					self.approveEmpInsuranceTitle(oj.Translations.getTranslatedString('insurance.approveInsurance'));
					self.policyNoLable(oj.Translations.getTranslatedString('insurance.policyno'));
					self.serviceProLable(oj.Translations.getTranslatedString('insurance.serviceprovider'));
					self.claimLable(oj.Translations.getTranslatedString('insurance.claimref'));
					self.claimDateLable(oj.Translations.getTranslatedString('insurance.dateofclaim'));
					self.amountLable(oj.Translations.getTranslatedString('insurance.amount'));
					self.currencyLable(oj.Translations.getTranslatedString('insurance.currency'));
					self.remarkLable(oj.Translations.getTranslatedString('insurance.remarks'));
					self.btnnext(oj.Translations.getTranslatedString('leave.btnnext'));	
					self.totalexplabel(oj.Translations.getTranslatedString('insurance.totalexp'));
					self.amountreimlabel(oj.Translations.getTranslatedString('insurance.amountreim'));
					self.amountforreimlabel(oj.Translations.getTranslatedString('insurance.amountforreim'));
					self.remarkLable(oj.Translations.getTranslatedString('insurance.remarks'));
					self.btnadd(oj.Translations.getTranslatedString('insurance.add'));		  
					self.approver(oj.Translations.getTranslatedString('insurance.approver'));
					self.btnsubmit(oj.Translations.getTranslatedString('leave.btnsubmit'));	
					self.btnback(oj.Translations.getTranslatedString('leave.btnback'));	
					app.empidlabel(oj.Translations.getTranslatedString('dashboard.employeeid')); 
					app.btnapprove(oj.Translations.getTranslatedString('dashboard.approve'));
					app.btnreject(oj.Translations.getTranslatedString('dashboard.reject'));
					
					self.approvercolumnarray = [{"headerText": oj.Translations.getTranslatedString('leave.lineno'), 
									"field": "approver_order_number"},
									{"headerText": oj.Translations.getTranslatedString('leave.approver'), 
									"field": "display_name"},
									{"headerText": oj.Translations.getTranslatedString('leave.category'), 
									"field": "approver_category"}];
      
     
					self.empInsuranceColumnArray = [{"headerText": oj.Translations.getTranslatedString('insurance.select'),
								  "renderer": oj.KnockoutTemplateUtils.getRenderer("checkbox_tmpl", true),
								   "id": "column1"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.persontype'),
								   "field": "PersonType",
								   "id": "column2"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.empno'),
								   "field": "EmpNo",
								   "id": "column3"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.name'),
								   "field": "NameEN",
								   "id": "column4"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.arabicname'),
								   "field": "NameAR",
								   "id": "column5"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.job'),
									"field": "JobName",
									"id": "column6"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.dob'),
									"field": "DOB",
									"id": "column7"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.idno'),
									"field": "PersonId",
									"id": "column8"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.phone'),
									"field": "PhoneNo",
									"id": "column9"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.city'),
								  "field": "City",
								  "id": "column10"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.datecover'),
								  "field": "DateCover",
								  "id": "column10"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.gender'),
								  "field": "Gender",
								  "id": "column11"},
								  {"headerText": oj.Translations.getTranslatedString('insurance.status'),
								  "field": "InsuranceStatus",
								  "id": "column12"}];
								  
						document.getElementById('empInsuranceTable').columns = self.empInsuranceColumnArray;
						document.getElementById('empInsuranceTable').refresh();
						
						
							self.empgrivanceColumnArray = [//{"headerText": oj.Translations.getTranslatedString('insurance.status'), 
														   //		"field": "Status"},
																{"headerText": oj.Translations.getTranslatedString('insurance.policyno'), 
																"field": "PolicyNum"},
																{"headerText": oj.Translations.getTranslatedString('insurance.serviceprovider'), 
																"field": "ServicePro"},
																{"headerText": oj.Translations.getTranslatedString('insurance.claimref'), 
																"field": "ClaimRefNum"},
																{"headerText": oj.Translations.getTranslatedString('insurance.amount'), 
																"field": "Amount"},
																{"headerText": oj.Translations.getTranslatedString('insurance.remarks'), 
																"field": "Remarks"},
																{"headerText": oj.Translations.getTranslatedString('insurance.addressed'), 
																"field": "Addressed"},
																{"headerText": oj.Translations.getTranslatedString('insurance.approverremarks'), 
																	"field": "ApproverRemarks"}]
							
							document.getElementById('empgrivanceTable').columns = self.empgrivanceColumnArray;
							document.getElementById('empgrivanceTable').refresh();
						 

							self.empReimbursementColumnArray = [//{"headerText": oj.Translations.getTranslatedString('insurance.status'), "field": "Status"},
																{"headerText": oj.Translations.getTranslatedString('insurance.policyno'), 
																"field": "PolicyNum"},
																{"headerText": oj.Translations.getTranslatedString('insurance.serviceprovider'), 
																"field": "ServicePro"},
																{"headerText": oj.Translations.getTranslatedString('insurance.dateofclaim'), 
																"field": "DateOfClaim"},
																{"headerText": oj.Translations.getTranslatedString('insurance.totalexp'), 
																"field": "TotalExpense"},
																{"headerText": oj.Translations.getTranslatedString('insurance.amountreim'), 
																"field": "AmtRmbByIns"},
																{"headerText": oj.Translations.getTranslatedString('insurance.amountforreim'), 
																"field": "AmtForRmb"},
																{"headerText": oj.Translations.getTranslatedString('insurance.currency'), 
																"field": "Currency"},
																{"headerText": oj.Translations.getTranslatedString('insurance.remarks'), 
																"field": "Remarks"}]
					
							document.getElementById('empReimbursementTable').columns = self.empgrivanceColumnArray;
							document.getElementById('empReimbursementTable').refresh();
					
				}
			);
			
		}
		
		self.confirmOK = function ()
		{
			localStorage.setItem('state','');
			$('.insuranceLowerContainer').hide();
			$('.insuranceUpperContainer').show();
			document.querySelector('#ConfirmationModal').close(); 
		}
		
		self.closeErrorDialog = function ()
		{
			document.querySelector('#errorDialog').close();
		}
		
		self.closeMsgDialog = function ()
		{
			document.querySelector('#messageDialog').close();
		}
		
		$(function(){
			empInsTable = document.getElementById('empInsuranceTable');
			empInsTable.addEventListener('selectionChanged', self.empInsSelectionListener);
			$('#empInsuranceTable').on('click', '.oj-checkboxset', self.empInsSyncCheckboxes);
			
			//appEmpInsTable = document.getElementById('approveEmpInsuranceTable');
			//appEmpInsTable.addEventListener('selectionChanged', self.appEmpInsSelectionListener);
			//$('#approveEmpInsuranceTable').on('click', '.oj-checkboxset', self.appEmpInsSyncCheckboxes);
		});
    }
   
    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new InsuranceViewModel();
  }
);




