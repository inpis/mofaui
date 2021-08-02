/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojknockout','promise', 'ojs/ojlistview', 'ojs/ojdialog','ojs/ojarraydataprovider', 'ojs/ojtable', 'ojs/ojinputtext', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource'],
 function(oj, ko, $, app) {
  
    function DashboardViewModel() {
      var self = this;
      //self.nowrap = ko.observable(false);
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.
	  self.notification = ko.observable();
	  self.notification(oj.Translations.getTranslatedString('dashboard.notification')); 
	  self.title = ko.observable();
	  self.title(oj.Translations.getTranslatedString('dashboard.title')); 
	  self.pendingapp = ko.observable();
	  self.pendingapp(oj.Translations.getTranslatedString('dashboard.pendingapp')); 
	  self.quicklink = ko.observable();
	  self.quicklink(oj.Translations.getTranslatedString('dashboard.quicklink')); 
	  self.leaverequest = ko.observable();
	  self.leaverequest(oj.Translations.getTranslatedString('dashboard.leaverequest')); 
	  self.insuranceTitle = ko.observable();
      self.insuranceTitle(oj.Translations.getTranslatedString('insurance.medicalinsurance'));
      self.grievanceTitle = ko.observable();
      self.grievanceTitle(oj.Translations.getTranslatedString('insurance.insuranceGrievance'));
      self.reimbursementTitle = ko.observable();
      self.reimbursementTitle(oj.Translations.getTranslatedString('insurance.expenseReimbursment'));
      self.approveEmpInsuranceTitle = ko.observable();
      self.approveEmpInsuranceTitle(oj.Translations.getTranslatedString('insurance.approveInsurance'));	 
	  self.commentTitle = ko.observable();
	  self.commentTitle(oj.Translations.getTranslatedString('leave.comment'));	
	  self.btnsubmit = ko.observable();
	  self.btnsubmit(oj.Translations.getTranslatedString('leave.btnsubmit'));	
	  
	  self.pendingappdataprovider = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(app.pendingapps, {idAttribute: 'NotificationId'}));	
	  self.notificationdataprovider = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(app.notifications,  {keys: app.notifications().map(function(value) { return value.NotificationId; })}));	  
	  
	  self.comment = ko.observable("");
	  self.selectedRow = ko.observable("");
	  
	  self.errormessage = ko.observable("");
	  
	  self.columnArray = [
		  {"headerText": "Subject","field": "Subject"},
		  {"headerRenderer": oj.KnockoutTemplateUtils.getRenderer("action_header", true),"renderer": oj.KnockoutTemplateUtils.getRenderer("action_buttons", true)}
	  ];
	  
	  self.beforeCurrentRowListener = function(event)
	  {
        var data = event.detail;
		//console.log(data.currentRow);
		self.selectedRow(data.currentRow);
	  }
	  
	  //on open comment dialog 
	  self.onopen = function ()
	  {
		  document.querySelector('#commentDialog').close();
		  self.submitApproval();
	  }
	  
	  self.submitApproval = function(action)
	  {
		//get table
		var element = document.getElementById('pendingApprovalTable'); 
		//get current pending app
		var currpending = '';
		
		for (var i = 0; i < app.pendingapps().length; i++){
		  // look for the entry with a matching `code` value
		  if (app.pendingapps()[i].NotificationId === self.selectedRow().rowKey){
			 currpending = app.pendingapps()[i];
			 break;
		  }
		}  
			
		var restWebUrl = localStorage.getItem('restURL');
		document.querySelector('#loader').open();
		//Approve Reject 
		$.ajax({
		  url         : restWebUrl+"/CommonAPI/approveWork",
		  method      : "post",
		  crossDomain : "true",
		  headers     : {
		  "content-type": "application/x-www-form-urlencoded" 
		  },
		  data        : {
			"username": app.username(),
			"itemtype": currpending.ItemType,
			"itemkey": currpending.ItemKey,
			"result": action, 
			"notificationid":self.selectedRow().rowKey, 
			"usercomment": self.comment()
		  }
		}).done(function(response) {
			document.querySelector('#loader').close();
			if (response.Status.Error)
			{
				self.errormessage(response.Status.Error);
				document.querySelector('#messageDialog').open();
			}
			/*console.log(element);
			console.log(self.selectedRow().rowIndex);
			app.pendingapps().splice(self.selectedRow().rowIndex, 1);
			element.refresh();*/
			self.reloaddata();
		})
		.fail(function(xhr, status, error) {
		  document.querySelector('#loader').close();
		  //self.errormessage("Couldn't submit approval due to " + error);
		  //document.querySelector('#messageDialog').open();
		  //alert("Couldn't submit, Please try again after some time");
		  console.error(error);
		});
	  }
	  
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
		  localStorage.setItem('state','dashboard');
		  $('#globalBody').removeClass('loginBody');
		  $('.header,footer').show();
		  
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
		 
		var table = document.getElementById('pendingApprovalTable');
		table.addEventListener('ojBeforeCurrentRow', self.beforeCurrentRowListener);
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
	  
	  self.reloaddata = function()
	  {
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
			//Get Pending Approval 
			$.ajax({
			  url         : restWebUrl+"/CommonAPI/pendingWorkList",
			  method      : "post",
			  crossDomain : "true",
			  headers     : {
			  "content-type": "application/x-www-form-urlencoded" 
			  },
			  data        : {
				"username": app.username()
			  }
			}).done(function(response) {
			  if (response.PendingWork[0].Error) {
				//self.errormessage(response.Error);
				//document.querySelector('#messageDialog').close();
				app.pendingapps([]);
				console.log("Error load Pending App : " + response.PendingWork[0].Error);
			  }
			  else
			  {
				  app.pendingapps(response.PendingWork);
			  }
			  
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
					document.querySelector('#loader').close();
				})
				.fail(function(xhr, status, error) {
				  document.querySelector('#loader').close();
				  //self.errormessage("Couldn't load notification due to " + error);
				  //document.querySelector('#messageDialog').open();
				  //alert("Couldn't load notification, Please try again after some time");
				  console.error(error);
				});
			  
			 
			})
			.fail(function(xhr, status, error) {
			  document.querySelector('#loader').close();
			  //self.errormessage("Couldn't load pending approval due to " + error);
			  //document.querySelector('#messageDialog').open();
			  //alert("Couldn't load pending approval, Please try again after some time");
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
					self.pendingapp(oj.Translations.getTranslatedString('dashboard.pendingapp')); 
					self.quicklink(oj.Translations.getTranslatedString('dashboard.quicklink')); 
					self.leaverequest(oj.Translations.getTranslatedString('dashboard.leaverequest')); 
					self.insuranceTitle(oj.Translations.getTranslatedString('insurance.medicalinsurance'));
					self.grievanceTitle(oj.Translations.getTranslatedString('insurance.insuranceGrievance'));
					self.reimbursementTitle(oj.Translations.getTranslatedString('insurance.expenseReimbursment'));
					self.approveEmpInsuranceTitle(oj.Translations.getTranslatedString('insurance.approveInsurance'));	 
					self.commentTitle(oj.Translations.getTranslatedString('leave.comment'));	
					self.btnsubmit(oj.Translations.getTranslatedString('leave.btnsubmit'));	 
					app.empidlabel(oj.Translations.getTranslatedString('dashboard.employeeid')); 
					app.btnapprove(oj.Translations.getTranslatedString('dashboard.approve'));
					app.btnreject(oj.Translations.getTranslatedString('dashboard.reject'));		
						
				}
			);
			
	  }
	  
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
	
  }
);
