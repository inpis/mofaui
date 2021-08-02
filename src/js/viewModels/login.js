/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your Login ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojknockout', 'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojselectcombobox', 'ojs/ojdialog'],
 function(oj, ko, $, app) {
  
    function LoginViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.
	  
	  self.username = ko.observable();
      self.password = ko.observable("");
	  self.userType =ko.observable();
	  self.userlabel = ko.observable();
	  self.userlabel(oj.Translations.getTranslatedString('login.user')); 
	  self.passlabel = ko.observable();
	  self.passlabel(oj.Translations.getTranslatedString('login.pass')); 
	  self.title = ko.observable();
	  self.title(oj.Translations.getTranslatedString('login.title')); 
	  self.subtitle = ko.observable();
	  self.subtitle(oj.Translations.getTranslatedString('login.subtitle')); 
	  self.language = ko.observable();
	  self.language(oj.Translations.getTranslatedString('login.lang')); 
	  self.configURL  = ko.observable("http://");

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
          $('.header,footer').hide();
          $('#globalBody').addClass('loginBody');
		  localStorage.removeItem('lang');
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
	  
	  // GET REST WEB SERVICES CONFIGURATION FORM
      self.getConfigForm = function() {
        //oj.Router.rootInstance.go('setting');
		var restWebUrl = localStorage.getItem('restURL');
		if (restWebUrl)
		{
			self.configURL(restWebUrl); 
		}
		
		document.querySelector('#setting').open();
      }
	  
	  self.valueChangeHandler =  function(event) {
		/*if (event['detail'].value) {
			var newLang = event['detail'].value;
		
			switch (newLang) {	
				case 'Arabic':
					newLang = 'ar-EG';
					self.formats(["arabic"]);
					break;
				default:
					newLang = 'en-US';
					self.formats(["english"]);
			}
			oj.Config.setLocale(newLang,
				function () {
					$('html').attr('lang', newLang);
					if (newLang === 'ar-EG') {
						$('html').attr('dir', 'rtl');
					} else {
						$('html').attr('dir', 'ltr');
					}
					self.userlabel(oj.Translations.getTranslatedString('login.user')); 
					self.passlabel(oj.Translations.getTranslatedString('login.pass')); 
					self.title(oj.Translations.getTranslatedString('login.title')); 
					self.subtitle(oj.Translations.getTranslatedString('login.subtitle')); 
					self.language(oj.Translations.getTranslatedString('login.lang'));
					//$('#dateInput').ojInputDateTime('refresh');
				}
			);
		}*/
	  };
      
      //
      // Functionality to Enable Go button
      $(function() {
        $('#user-input').on('keydown', function(ev) {
          var mobEvent    = ev;
          var mobPressed  = mobEvent.keyCode || mobEvent.which;
          if (mobPressed == 13) {
            $('#user-input').blur();
            $('#password').focus();
          }
          return true;
        });
		
		$('#password').on('keydown', function(ev) {
          var mobEvent    = ev;
          var mobPressed  = mobEvent.keyCode || mobEvent.which;
          if (mobPressed == 13) {
		   $('#submit').focus();
           self.signIn();
          }
          return true;
        });
      });

      self.signIn = function() {
        var username = self.username();
        var password = self.password();

        if (!username || !password) {
          // Here we check null value and show error to fill
          (!username) ? document.getElementById('user-input').showMessages() : document.getElementById('password').showMessages();
        } else {
          // GET AND STORE REST WEB CONFIGURATION URL
          var restWebUrl = localStorage.getItem('restURL');
          if (restWebUrl === null) {
            document.querySelector('#invalidConfig').open();
          } else {
            //Loader Starts
            document.querySelector('#loader').open();
            
            $.ajax({
              url         : restWebUrl+"/user/login",
              method      : "post",
              crossDomain : "true",
              headers     : {
				"content-type": "application/x-www-form-urlencoded" 
              },
              data        : {
                "username": username,
                "password": password
              }
            }).done(function(response) {
              if (response.Error) {
			    // If authentication failed
				console.log(response.Error);
                document.querySelector('#loader').close();
                document.querySelector('#invalidUser').open();
              } else {
				// Successfull authentication
				localStorage.setItem('username',username);
			 	app.username(localStorage.getItem('username'));
                self.username(''); self.password('');
				localStorage.setItem('emptype',response.EmpType);
				app.employeetype(localStorage.getItem('emptype'));
				localStorage.setItem('personid',response.PersonId);
				app.personid(localStorage.getItem('personid'));
				localStorage.setItem('businessgroupid',response.BusinessGroupId);
				app.businessgroupid(localStorage.getItem('businessgroupid'));
				localStorage.setItem('businessgroup',response.BusinessGroup);
				app.businessgroupname(localStorage.getItem('businessgroup'));
				localStorage.setItem('lastname',response.LastName);
				app.lastname(localStorage.getItem('lastname'));
				localStorage.setItem('email',response.Email);
				app.emailaddress(localStorage.getItem('email')); 
				localStorage.setItem('employeeid',response.EmployeeId);
				app.employeenumber(localStorage.getItem('employeeid')); 
				localStorage.setItem('firstname',response.FirstName);
				app.firstname(localStorage.getItem('firstname')); 
				localStorage.setItem('fullname',response.FullName);
				app.fullname(localStorage.getItem('fullname')); 
				localStorage.setItem('gradename',response.GradeName);
				app.gradename(localStorage.getItem('gradename'));
				localStorage.setItem('jobname',response.JobName);
				app.jobname(localStorage.getItem('jobname'));
				localStorage.setItem('positionname',response.PositionName);
				app.positionname(localStorage.getItem('positionname'));
				localStorage.setItem('locationname',response.LocationName);
				app.locationcode(localStorage.getItem('locationname')); 
				localStorage.setItem('assignmentcategory',response.AssignmentCategory + '');
				app.assigmentcategory(localStorage.getItem('assignmentcategory'));
				localStorage.setItem('assignmentid',response.AssignmentId + '');
				app.assigmentid(localStorage.getItem('assignmentid'));
				//$('.oj-applayout-fixed-bottom').show();
				
				oj.Router.rootInstance.go('dashboard');
			  }
              
			  
            })
            .fail(function(xhr, status, error) {
              document.querySelector('#loader').close();
              //alert("Couldn't Connect to Server, Please try again after some time");
			  console.error(error);
            });
			
			/*$.ajax({
              url         : "http://localhost:8080/ribwebservice/rest/service/loadArabic",
              method      : "get",
              crossDomain : "true"
            }).done(function(response) {
              if (response) {
                // Successfull authentication
				self.language(response[0].prompt);
			   
              } else {
                // If authentication failed
                //document.querySelector('#loader').close();
                //document.querySelector('#invalidUser').open();
              }
            })
            .fail(function(xhr, status, error) {
              document.querySelector('#loader').close();
              alert("Couldn't Connect to Server, Please try again after some time");
            });*/
          }
        }
          oj.Router.sync();
      };

	  
	  self.configureURL = function() {
        var url = self.configURL();
        if(url == undefined) {
          document.getElementById('url').showMessages()
        } else {
			var restWebConfigUrl = self.configURL();
			// ENABLE LOCAL STORAGE FOR CONFIGURATION URL
			var storage = window.localStorage;
			var value   = storage.getItem('restURL'); // Key name to get its value.
			storage.setItem('restURL', restWebConfigUrl) // Key name and its value to add or update that key.
			document.querySelector('#setting').close();
        }
      }
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new LoginViewModel();
  }
);
