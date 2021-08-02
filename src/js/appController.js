/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko, $) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

	  
	  self.leavetab = ko.observable();
	  self.leavetab(oj.Translations.getTranslatedString('dashboard.leavetab')); 
	  self.instab = ko.observable();
	  self.instab(oj.Translations.getTranslatedString('dashboard.instab')); 
	  self.dashboardtab = ko.observable();
	  self.dashboardtab(oj.Translations.getTranslatedString('dashboard.dashboardtab')); 
	  
       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
		 'login': {label: 'Login'},
         'dashboard': {label: self.leavetab(), isDefault: true},
         'insurance': {label: self.instab()},
         'leaves': {label: self.dashboardtab()},
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
	  

      // Navigation setup
      var navData = [
      {name: self.dashboardtab(), id: 'dashboard',
       iconClass: ''},
      {name: self.instab(), id: 'insurance',
       iconClass: ''},
      {name: self.leavetab(), id: 'leaves',
       iconClass: ''},
     
      ];
	  
	  self.navs = ko.observableArray(navData);
	  
      self.navDataSource = new oj.ArrayTableDataSource(self.navs, {idAttribute: 'id'});

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("HRMS");
      // User Info used in Global Navigation area
	  self.username = ko.observable("");
	  self.employeetype = ko.observable("");
	  self.personid = ko.observable(""); 
	  self.businessgroupid = ko.observable(""); 
	  self.businessgroupname = ko.observable("");
	  self.lastname = ko.observable("");
	  self.emailaddress = ko.observable(""); 
	  self.employeenumber = ko.observable(""); 
	  self.firstname = ko.observable(""); 
	  self.fullname = ko.observable(""); 
	  self.gradename = ko.observable(""); 
	  self.jobname = ko.observable("");
	  self.positionname = ko.observable(""); 
	  self.locationcode = ko.observable(""); 
	  self.assigmentcategory = ko.observable("");
	  self.assigmentid = ko.observable("");
	  self.lang = ko.observable("English");
	  self.formats = ko.observableArray(["english"]);
	  
	  var leavetypeArray =  [{value: '', label: ''}];
	  self.leavetypes = ko.observableArray(leavetypeArray);
	  
	  var pendingappArray =  [{NotificationId:1, Subject: 'No Item to display', ItemType:"1", ItemKey:"abc"}];
	  self.pendingapps = ko.observableArray(pendingappArray);
	  
	  var notificationArray =  [{NotificationId:1, Subject: 'No Item to display'}];
	  self.notifications = ko.observableArray(notificationArray);
	  
	  var approverArray =  [{approver_order_number: 1, display_name :'ABC', approver_category:'app', approval_status:'approve'}];
	  self.approvers = ko.observableArray(approverArray);
	  
	  var insuranceArray = [
        {Selected: ko.observable([]), PersonType: '', EmpNo: 'ADFPM 1001 neverending', NameEN: 200, NameAR: 300,JobName:'-',DOB:'12/06/1989',idNo:4356,PhoneNo:'-',city:'-',DateCOver:'12/11/2018',Gender:'-',InsuranceStatus:'Active'},
      ];
	  self.empInsuranceArray = ko.observableArray(insuranceArray);

	  
	  self.empidlabel = ko.observable();
	  self.empidlabel(oj.Translations.getTranslatedString('dashboard.employeeid')); 
	  self.btnapprove = ko.observable();
	  self.btnapprove(oj.Translations.getTranslatedString('dashboard.approve'));
	  self.btnreject = ko.observable();
	  self.btnreject(oj.Translations.getTranslatedString('dashboard.reject'));		  
	  
	  self.signOut = function() {
		$('#globalBody').addClass('loginBody');
		localStorage.removeItem('username');
		localStorage.removeItem('emptype');
		localStorage.removeItem('personid');
		localStorage.removeItem('businessgroupid');
		localStorage.removeItem('businessgroup');
		localStorage.removeItem('lastname');
		localStorage.removeItem('email'); 
		localStorage.removeItem('employeeid'); 
		localStorage.removeItem('firstname'); 
		localStorage.removeItem('fullname'); 
		localStorage.removeItem('gradename');
		localStorage.removeItem('jobname');
		localStorage.removeItem('positionname');
		localStorage.removeItem('locationname'); 
		localStorage.removeItem('assignmentcategory');
		localStorage.removeItem('assignmentid');
		localStorage.removeItem('state');
		localStorage.removeItem('lang');
		self.userInfo = {};
		self.router.go('login');
		setTimeout(function() 
		{ 
			location.reload();
		}, 0);
	  }
	  
	  self.action = ko.observable("");
	 
      // Footer
      /*function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);*/
     }

     return new ControllerViewModel();
  }
);
