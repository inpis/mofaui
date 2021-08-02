/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your LeavesViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojarraydataprovider','ojs/ojdialog','ojs/ojinputtext', 'ojs/ojlabel','ojs/ojselectcombobox','ojs/ojdatetimepicker','ojs/ojtimezonedata', 'ojs/ojdialog', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource','ojs/ojvalidationgroup'],
 function(oj, ko, $, app) {
  
    function LeavesViewModel() {
      var self = this;

	  self.notification = ko.observable();
	  self.notification(oj.Translations.getTranslatedString('dashboard.notification')); 
	  self.leavesummary = ko.observable();
	  self.leavesummary(oj.Translations.getTranslatedString('leave.leavesummary')); 
	  self.btncreate = ko.observable();
	  self.btncreate(oj.Translations.getTranslatedString('leave.btncreate')); 
	  self.empname = ko.observable();
	  self.empname(oj.Translations.getTranslatedString('leave.empname')); 
	  self.assignmentcategory = ko.observable();
	  self.assignmentcategory(oj.Translations.getTranslatedString('leave.assignmentcategory')); 
	  self.position = ko.observable();
	  self.position(oj.Translations.getTranslatedString('leave.position')); 
	  self.location = ko.observable();
	  self.location(oj.Translations.getTranslatedString('leave.location')); 
	  self.empno = ko.observable();
	  self.empno(oj.Translations.getTranslatedString('leave.empno'));
	  self.grade = ko.observable();
	  self.grade(oj.Translations.getTranslatedString('leave.grade'));
	  self.dept = ko.observable();
	  self.dept(oj.Translations.getTranslatedString('leave.dept'));
	  self.startdate = ko.observable();
	  self.startdate(oj.Translations.getTranslatedString('leave.startdate'));	  
	  self.enddate = ko.observable();
	  self.enddate(oj.Translations.getTranslatedString('leave.enddate'));	  
	  self.abstype = ko.observable();
	  self.abstype(oj.Translations.getTranslatedString('leave.abstype')); 
	  self.days = ko.observable();
	  self.days(oj.Translations.getTranslatedString('leave.days')); 
	  self.appstatus = ko.observable();
	  self.appstatus(oj.Translations.getTranslatedString('leave.appstatus')); 
	  self.abstatus = ko.observable();
	  self.abstatus(oj.Translations.getTranslatedString('leave.abstatus')); 
	  self.leavetype = ko.observable();
	  self.leavetype(oj.Translations.getTranslatedString('leave.leavetype'));
	  self.decisiondate = ko.observable();
	  self.decisiondate(oj.Translations.getTranslatedString('leave.decisiondate'));
	  self.decisionfrom = ko.observable();
	  self.decisionfrom(oj.Translations.getTranslatedString('leave.decisionfrom'));
	  self.duration = ko.observable();
	  self.duration(oj.Translations.getTranslatedString('leave.duration'));	  
	  self.total = ko.observable();
	  self.total(oj.Translations.getTranslatedString('leave.total'));
	  self.replacedby = ko.observable();
	  self.replacedby(oj.Translations.getTranslatedString('leave.replacedby'));	  
	  self.btnnext = ko.observable();
	  self.btnnext(oj.Translations.getTranslatedString('leave.btnnext'));	  
	  self.applyleave = ko.observable();
	  self.applyleave(oj.Translations.getTranslatedString('leave.applyleave')); 
	  self.confirmmessage = ko.observable();
	  self.confirmmessage(oj.Translations.getTranslatedString('leave.confirmmessage')); 
	  self.approver = ko.observable();
	  self.approver(oj.Translations.getTranslatedString('leave.approver')); 
	  self.lineno = ko.observable();
	  self.lineno(oj.Translations.getTranslatedString('leave.lineno')); 
	  self.category = ko.observable();
	  self.category(oj.Translations.getTranslatedString('leave.category')); 
	  self.btnsubmit = ko.observable();
	  self.btnsubmit(oj.Translations.getTranslatedString('leave.btnsubmit'));	
	  self.btnback = ko.observable();
	  self.btnback(oj.Translations.getTranslatedString('leave.btnback'));	
	  
	  self.absencetypeval = ko.observable("Annual Leave");
	  self.startdateval = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
	  self.enddateval = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
	  self.replacedbyval = ko.observable("");
	  self.absenceleavetypeval = ko.observable("");
	  self.totaldays = ko.observable("");
	  self.startdateval2 = ko.observable("");
	  self.enddateval2 = ko.observable("");
	  self.itemKey = ko.observable("");
	  self.replacedbyname = ko.observable("");
	  
	  self.leavetable = ko.observable("");
	  
	  self.replacedbylist = ko.observableArray([
        {value: '', label: ''}
      ]);
	  
	  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).
	   createConverter(
		{
		  pattern : 'dd-MMM-yyyy'
		}));
		
		
	  self.leavetypedataprovider = new oj.ArrayDataProvider(app.leavetypes, {idAttribute: 'value'});
	  	 
      self.approveleavedataprovider = new oj.ArrayDataProvider(app.approvers, {idAttribute: 'approver_order_number'});
	  
	  
	  var empLeaveArray = [{StartDate: '25/02/2018', EndDate: '27/02/2018', AbsenceCategoryCode: 'Annual Type', AbsenceCategory: 'Paid Leave',Days:2,ApprovalStatus:'Approved',AbsenceStatus:'Confirmed',Type:'Without Ticket'}];
	  self.empLeaveObservableArray = ko.observableArray(empLeaveArray);
	  self.dataprovider = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.empLeaveObservableArray, {idAttribute: ['StartDate','EndDate']}));
	  
	  self.approveleaveColumnArray = [{"headerText": oj.Translations.getTranslatedString('leave.startdate'), 
							   "field": "StartDate"},
							  {"headerText": oj.Translations.getTranslatedString('leave.enddate'), 
							   "field": "EndDate"},
							  {"headerText": oj.Translations.getTranslatedString('leave.abstype'), 
							   "field": "AbsenceCategory"},
							  {"headerText": oj.Translations.getTranslatedString('leave.days'), 
							   "field": "AbsenceDays"},
							  {"headerText": oj.Translations.getTranslatedString('leave.appstatus'), 
							   "field": "ApprovalStatus"},
							  {"headerText": oj.Translations.getTranslatedString('leave.abstatus'), 
								"field": "AbsenceStatus"},
							  {"headerText": oj.Translations.getTranslatedString('leave.leavetype'), 
								 "field": "Type"}];
								 
								 
	  self.approvercolumnarray = [{"headerText": oj.Translations.getTranslatedString('leave.lineno'), 
									"field": "approver_order_number"},
									{"headerText": oj.Translations.getTranslatedString('leave.approver'), 
									"field": "display_name"},
									{"headerText": oj.Translations.getTranslatedString('leave.category'), 
									"field": "approver_category"}];
	  
	  self.notificationdataprovider = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(app.notifications,  {keys: app.notifications().map(function(value) { return value.NotificationId; })}));	
	  
	  var itemkey;
	  
	  self.policyTypeData = ko.observable();
	  self.errormessage = ko.observable("");
	  self.btnnextdisabled = ko.observable(true);
	  
	  self.logMsg = ko.computed(function() {
        var data = self.policyTypeData();
        if (data) {
          var valueObj = {};
          valueObj.value = data.value;
		  console.log(valueObj.value);
		  
		  var currType = '';
		
		for (var i = 0; i < app.leavetypes().length; i++){
		  // look for the entry with a matching `code` value
		  if (app.leavetypes()[i].value === valueObj.value){
			 currType = app.leavetypes()[i];
			 break;
		  }
		}  
			  
          if(valueObj.value == "Annual Leave"){
            $('.educationLeave').hide();
            $('.annualLeave').show();
			
          }else if(valueObj.value == "Education Leave"){
            $('.annualLeave').hide();
            $('.educationLeave').show();
          }
		  $('#absence-category').val(currType.category);
		  self.startdateval(oj.IntlConverterUtils.dateToLocalIso(new Date()));
		  self.enddateval(oj.IntlConverterUtils.dateToLocalIso(new Date()));
		  self.replacedbyval("");
		  self.absenceleavetypeval("Without Ticket");
		  self.totaldays("");
          return JSON.stringify(valueObj);
        }
      });
	  
	  self.valueChangedHandler = function (event) {
		self.policyTypeData(event['detail']);
	  }
	  
      this.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2018, 1, 1)));
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.

	  
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
		$(function(){
		  localStorage.setItem('state','leave');
		  $('#globalBody').removeClass('loginBody');
		  $('.header,footer').show();
       	
		  self.reloadlanguage();
		
		  //reload data
	      self.reloaddata();
		  
		  self.leavetable(document.getElementById('leaveTable'));

		  var notifiHeight = $(".notificationList").outerHeight();
		  var employeeDetailHeight = $(".employeeDetails").outerHeight() + 65;
		  var leaveTableHeight = Math.floor(notifiHeight - employeeDetailHeight)
		  //console.log(notifiHeight + "-" + employeeDetailHeight + "="+ leaveTableHeight);
		  $(".leaveTable").css("height", leaveTableHeight);
		  
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
	  
	  self.reloaddata = function ()
	  {
			//reload data
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
			
			var restWebUrl = localStorage.getItem('restURL');
			//document.querySelector('#loader').open();
			
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
				
				//Load Absense Summary
				$.ajax({
				  url         : restWebUrl+"/leave/absenceSummary",
				  method      : "post",
				  crossDomain : "true",
				  headers     : {
				  "content-type": "application/x-www-form-urlencoded" 
				  },
				  data        : {
					"personid": app.personid(),
					"businessgroupid": app.businessgroupid()
				  }
				}).done(function(response) {
				  if (response.Summary[0].Error) {
					//self.errormessage(response.Summary[0].Error);
					//document.querySelector('#messageDialog').open();
					self.empLeaveObservableArray([]);
					console.log("Error load summary : " + response.Summary[0].Error);
				  } else {
					
					self.empLeaveObservableArray(response.Summary);
					
				  }
				  
					//Load Leave Types
					$.ajax({
					  url         : restWebUrl+"/leave/typeList",
					  method      : "post",
					  crossDomain : "true",
					  headers     : {
					  "content-type": "application/x-www-form-urlencoded" 
					  },
					  data        : {
						"businessgroupid": app.businessgroupid()
					  }
					}).done(function(response) {
					  if (response.Error) {
						self.errormessage(response.Error);
					  } else {
						// Successfull authentication
						app.leavetypes(response.Summary);
					  }
					  
					   // load replaced by
					   $.ajax({
							url         : restWebUrl+"/leave/rplperson?username=" + app.username().toUpperCase(),
							method      : "GET",
							crossDomain : "true",
							headers     : {
							}
						}).done(function(response) {
							if (response.RplPerson[0].Error)
							{
								self.replacedbylist([]);
							}
							else
							{
								$.each(response.RplPerson, function (index, item) {
								  self.replacedbylist.push({ value: item.PersonId, label: item.PersonName });
								});
							}
							
							document.querySelector('#loader').close();
						})
						.fail(function(xhr, status, error) {
						  document.querySelector('#loader').close();
						  //self.errormessage("Couldn't load leave type due to " + error);
						  //document.querySelector('#messageDialog').open();
						  //alert("Couldn't load leave type, Please try again after some time");
						  console.error(error);
						});
					  
					})
					.fail(function(xhr, status, error) {
					  document.querySelector('#loader').close();
					  //self.errormessage("Couldn't load leave type due to " + error);
					  //document.querySelector('#messageDialog').open();
					  //alert("Couldn't load leave type, Please try again after some time");
					  console.error(error);
					});
					
				})
				.fail(function(xhr, status, error) {
				  document.querySelector('#loader').close();
				  //self.errormessage("Couldn't load absence summary due to " + error);
				  //document.querySelector('#messageDialog').open();
				  //alert("Couldn't load absence summary, Please try again after some time");
				  console.error(error);
				});  
			})
			.fail(function(xhr, status, error) {
			  document.querySelector('#loader').close();
			  //self.errormessage("Couldn't load notification due to " + error);
			  //document.querySelector('#messageDialog').open();
			  //alert("Couldn't load notification, Please try again after some time");
			  console.error(error);
			});
	  }
	  
	  
	  //create leave
	  self.createLeave = function ()
	  {
		  $('.educationLeave').hide();
		  self.absencetypeval("Annual Leave");
		  self.startdateval(oj.IntlConverterUtils.dateToLocalIso(new Date()));
		  self.enddateval(oj.IntlConverterUtils.dateToLocalIso(new Date()));
		  self.replacedbyval("");
		  self.absenceleavetypeval("Without Ticket");
		  self.totaldays("");
		  self.btnnextdisabled(true);
		  document.querySelector('#applyLeaveModal').open(); 
	  }
	  
	  //submit leave
	  self.next = function() {
		document.querySelector('#loader').open();  
		
		//Find replaced by name
		if (self.replacedbyval() != '')
		{
			for (var i = 0; i < self.replacedbylist().length; i++){
			  // look for the entry with a matching `code` value
			  if (self.replacedbylist()[i].value === self.replacedbyval()){
				 self.replacedbyname(self.replacedbylist()[i].label);
				 break;
			  }
			}  
		}
		  
		var restWebUrl = localStorage.getItem('restURL');
	    self.errormessage('');
		//submit leave
		$.ajax({
		  url         : restWebUrl+"/leave/submitLeave",
		  method      : "post",
		  crossDomain : "true",
		  headers     : {
		  "content-type": "application/x-www-form-urlencoded" 
		  },
		  data        : {
			"username": app.username(),
			"absencetype": self.absencetypeval(),
			"absencereason": "",
			"startdate": self.startdateval(),
			"enddate": self.enddateval(),
			"tickettype": self.absenceleavetypeval(),
			"replpersonid": self.replacedbyval(),
			"remark": ""
		  }
		}).done(function(response) {
		  if (response.SubmitLeave.Error) {
			console.log(response.SubmitLeave.Error);
			self.errormessage(response.SubmitLeave.Error);
			document.querySelector('#messageDialog').open();
			document.querySelector('#loader').close();
		  } 
		  else 
		  {
			  
			var itemKey =  response.SubmitLeave.ItemKey;
			var transId= response.SubmitLeave.TransactionId;
			  
			//console.log(response);
			//Calculate days
			document.querySelector('#loader').open();  
		  
			var absid = '';
			
			for (var i = 0; i < app.leavetypes().length; i++){
			  // look for the entry with a matching `code` value
			  if (app.leavetypes()[i].value === self.absencetypeval()){
				 absid = app.leavetypes()[i].AbsenceAttendanceTypeId;
				 break;
			  }
			}  
			  
			$.ajax({
			  url         : restWebUrl+"/leave/calculate",
			  method      : "post",
			  crossDomain : "true",
			  headers     : {
			  "content-type": "application/x-www-form-urlencoded" 
			  },
			  data        : {
				"businessgroupid": app.businessgroupid(),
				"assignmentid": app.assigmentid(),
				"absAttndtypeid": absid,
				"startdate": self.startdateval(),
				"enddate": self.enddateval()
			  }
			}).done(function(response) {
			  if (response.Calculations.Error) {
				self.errormessage(response.Calculations.Error);
				document.querySelector('#messageDialog').open();
			  } else {
				self.totaldays(response.Calculations.AbsenceDays);
				//self.btnnextdisabled(false);
				
				var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

				var d = new Date(self.startdateval());
				self.startdateval2(d.getDate() + "-" + m_names[d.getMonth()] + "-" + d.getFullYear());
				
				d = new Date(self.enddateval());
				self.enddateval2(d.getDate() + "-" + m_names[d.getMonth()] + "-" + d.getFullYear());
				
				document.querySelector('#applyLeaveModal').close();
				document.querySelector('#applyLeaveNextModal').open(); 	
				
				if (itemKey)
				{
					self.itemKey(itemKey);
						
					document.querySelector('#loader').open();
					// get approver list
					$.ajax({
					  url         : restWebUrl+"/CommonAPI/getApproverList",
					  method      : "post",
					  crossDomain : "true",
					  headers     : {
					  "content-type": "application/x-www-form-urlencoded" 
					  },
					  data        : {
						"transactionid": transId
					  }
					}).done(function(response) {
					  if (response.Summary[0].Error)
					  {
						  app.approvers ([]); 
					  }
					  else
					  {
						  app.approvers (response.Summary); 
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
					console.log('a');
					document.querySelector('#loader').close();
				}
				
			  }
			  document.querySelector('#loader').close();
			})
			.fail(function(xhr, status, error) {
			  document.querySelector('#loader').close();
			  //alert("Couldn't calculate day, Please try again after some time");
			  console.error(error);
			});
			
			
				
		  }
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //alert("Couldn't save leave, Please try again after some time");
		  console.error(error);
		});
	  };
		
	  self.submit = function() {
		document.querySelector('#loader').open();  
		  
		var restWebUrl = localStorage.getItem('restURL');
	  
		//complete leave
		$.ajax({
		  url         : restWebUrl+"/leave/completeActivity",
		  method      : "post",
		  crossDomain : "true",
		  headers     : {
		  "content-type": "application/x-www-form-urlencoded" 
		  },
		  data        : {
			"itemkey": self.itemKey()
		  }
		}).done(function(response) {
		  if (response.Activity.Error) {
			console.log("Error complete leave : " + response.Activity.Error);
			self.errormessage(response.Activity.Error);
			document.querySelector('#messageDialog').open();
		  } else {
			document.querySelector('#applyLeaveNextModal').close();
            document.querySelector('#confirmationModal').open();    
		  }
		  
		  document.querySelector('#loader').close();
		  
		  self.reloaddata();
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //alert("Couldn't complete leave, Please try again after some time");
		  console.error(error);
		});
	  }
	  
	  self.calculate = function() {
		document.querySelector('#loader').open();  
		  
		var absid = '';
		
		for (var i = 0; i < app.leavetypes().length; i++){
		  // look for the entry with a matching `code` value
		  if (app.leavetypes()[i].value === self.absencetypeval()){
			 absid = app.leavetypes()[i].AbsenceAttendanceTypeId;
			 break;
		  }
		}  
		  
		var restWebUrl = localStorage.getItem('restURL');
	  
		//calculate days
		$.ajax({
		  url         : restWebUrl+"/leave/calculate",
		  method      : "post",
		  crossDomain : "true",
		  headers     : {
		  "content-type": "application/x-www-form-urlencoded" 
		  },
		  data        : {
			"businessgroupid": app.businessgroupid(),
			"assignmentid": app.assigmentid(),
			"absAttndtypeid": absid,
			"startdate": self.startdateval(),
			"enddate": self.enddateval()
		  }
		}).done(function(response) {
		  if (response.Calculations.Error) {
			self.errormessage(response.Calculations.Error);
			document.querySelector('#messageDialog').open();
		  } else {
			self.totaldays(response.Calculations.AbsenceDays);
			self.btnnextdisabled(false);
		  }
		  document.querySelector('#loader').close();
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //alert("Couldn't calculate day, Please try again after some time");
		  console.error(error);
		});
	  };
	  
	  self.dateChangedHandler = function (event) {
		if (event['detail'].value != event['detail'].previousvalue)
		{
			var temp = new Date(event['detail'].value);
			//temp.setDate(temp.getDate() + 1);
			self.enddateval(oj.IntlConverterUtils.dateToLocalIso(temp));
		}
      };
	  
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
					  self.leavesummary(oj.Translations.getTranslatedString('leave.leavesummary')); 
					  self.btncreate(oj.Translations.getTranslatedString('leave.btncreate')); 
					  self.empname(oj.Translations.getTranslatedString('leave.empname')); 
					  self.assignmentcategory(oj.Translations.getTranslatedString('leave.assignmentcategory')); 
					  self.position(oj.Translations.getTranslatedString('leave.position')); 
					  self.location(oj.Translations.getTranslatedString('leave.location')); 
					  self.empno(oj.Translations.getTranslatedString('leave.empno'));
					  self.grade(oj.Translations.getTranslatedString('leave.grade'));
					  self.dept(oj.Translations.getTranslatedString('leave.dept'));
					  self.startdate(oj.Translations.getTranslatedString('leave.startdate'));	  
					  self.enddate(oj.Translations.getTranslatedString('leave.enddate'));	  
					  self.abstype(oj.Translations.getTranslatedString('leave.abstype')); 
					  self.days(oj.Translations.getTranslatedString('leave.days')); 
					  self.appstatus(oj.Translations.getTranslatedString('leave.appstatus')); 
					  self.abstatus(oj.Translations.getTranslatedString('leave.abstatus')); 
					  self.leavetype(oj.Translations.getTranslatedString('leave.leavetype'));
					  self.decisiondate(oj.Translations.getTranslatedString('leave.decisiondate'));
					  self.decisionfrom(oj.Translations.getTranslatedString('leave.decisionfrom'));
					  self.duration(oj.Translations.getTranslatedString('leave.duration'));	  
					  self.total(oj.Translations.getTranslatedString('leave.total'));
					  self.replacedby(oj.Translations.getTranslatedString('leave.replacedby'));	  
					  self.btnnext(oj.Translations.getTranslatedString('leave.btnnext'));	  
					  self.applyleave(oj.Translations.getTranslatedString('leave.applyleave')); 
					  self.confirmmessage(oj.Translations.getTranslatedString('leave.confirmmessage')); 
					  self.approver(oj.Translations.getTranslatedString('leave.approver')); 
					  self.lineno(oj.Translations.getTranslatedString('leave.lineno')); 
					  self.category(oj.Translations.getTranslatedString('leave.category')); 
					  self.btnsubmit(oj.Translations.getTranslatedString('leave.btnsubmit'));	
					  self.btnback(oj.Translations.getTranslatedString('leave.btnback'));	
					  app.empidlabel(oj.Translations.getTranslatedString('dashboard.employeeid')); 
					  app.btnapprove(oj.Translations.getTranslatedString('dashboard.approve'));
					  app.btnreject(oj.Translations.getTranslatedString('dashboard.reject'));	
						
					  self.approveleaveColumnArray = [{"headerText": oj.Translations.getTranslatedString('leave.startdate'), 
							   "field": "StartDate"},
							  {"headerText": oj.Translations.getTranslatedString('leave.enddate'), 
							   "field": "EndDate"},
							  {"headerText": oj.Translations.getTranslatedString('leave.abstype'), 
							   "field": "AbsenceCategory"},
							  {"headerText": oj.Translations.getTranslatedString('leave.days'), 
							   "field": "AbsenceDays"},
							  {"headerText": oj.Translations.getTranslatedString('leave.appstatus'), 
							   "field": "ApprovalStatus"},
							  {"headerText": oj.Translations.getTranslatedString('leave.abstatus'), 
								"field": "AbsenceStatus"},
							  {"headerText": oj.Translations.getTranslatedString('leave.leavetype'), 
								 "field": "Type"}];
								 
								 
					self.approvercolumnarray = [{"headerText": oj.Translations.getTranslatedString('leave.lineno'), 
									"field": "approver_order_number"},
									{"headerText": oj.Translations.getTranslatedString('leave.approver'), 
									"field": "display_name"},
									{"headerText": oj.Translations.getTranslatedString('leave.category'), 
									"field": "approver_category"}];
									
					self.leavetable().columns = self.approveleaveColumnArray;
					self.leavetable().refresh();
				}
			);
			
	  }
	}
    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new LeavesViewModel();
  }
);
