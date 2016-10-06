
var dashboardApp = angular.module('dashboardApp', [
    'ngRoute',
    'dashboardControllers',
    'ngTable',
    'ngSanitize',
    'ui.select',
    'ngDialog',
    'ui.mask',
    'ui.utils.masks'
]);

dashboardApp.config(function(uiSelectConfig) {
	  uiSelectConfig.theme = 'select2';
});

dashboardApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home/list.html'
                ,controller: 'HomeController'
            }).
          	//============ QUERY ============//
            when('/query', {
                templateUrl: 'partials/query/list.html'
                ,controller: 'QueryController'
            }).
            //============ Forecast ===========//
            when('/forecast', {
                templateUrl: 'partials/forecast/list.html'
                ,controller: 'ForecastController'
            }).
            when('/forecast/:month', {
                templateUrl: 'partials/forecast/list.html'
                ,controller: 'ForecastController'
            }).
            //============ Daily Status ===========//
            when('/dailyStatus', {
                templateUrl: 'partials/dailyStatus/list.html'
                ,controller: 'DailyStatusController'
            }).
            //============ My Menu ============//
            when('/changePassword', {
                templateUrl: 'partials/my/changePassword.html'
                ,controller: 'ChangePasswordController'
            }).
            when('/myProfile', {
                templateUrl: 'partials/my/profile.html'
                ,controller: 'MyProfileController'
            }).
            when('/myProfileEdit', {
                templateUrl: 'partials/my/profileForm.html'
                ,controller: 'MyProfileEditController'
            }).
            when('/myActivityLog', {
                templateUrl: 'partials/my/activityLog.html'
                ,controller: 'MyActivityLogController'
            }).
            //============= MY EXPENSE REPORT =====//
            when('/myExpenseList', {
                templateUrl: 'partials/my/expenseList.html'
                ,controller: 'MyExpenseController'
            }).
            when('/myExpenseNew', {
                templateUrl: 'partials/my/expenseForm.html'
                ,controller: 'MyExpenseNewController'
            }).
            when('/myExpenseEdit/:_id', {
                templateUrl: 'partials/my/expenseForm.html'
                ,controller: 'MyExpenseEditController'
            }).
            when('/myExpenseDetail/:_id', {
                templateUrl: 'partials/my/expenseDetail.html'
                ,controller: 'MyExpenseDetailController'
            }).
            //============ JOB ============//
            when('/jobInfo', {
                templateUrl: 'partials/job/list.html'
                ,controller: 'JobController'
            }).
            when('/jobInfoNew', {
                templateUrl: 'partials/job/form.html'
                ,controller: 'JobNewController'
            }).
            when('/jobInfoDetail/:_id', {
                templateUrl: 'partials/job/detail.html'
                ,controller: 'JobDetailController'
            }).
            when('/jobInfoEdit/:_id', {
                templateUrl: 'partials/job/form.html'
                ,controller: 'JobEditController'
            }).
            when('/jobInfoServiceOrder0/:_id', {
                templateUrl: 'partials/job/serviceOrderOpen.html'
                ,controller: 'JobServiceOrderOpenController'
            }).
            when('/jobInfoServiceOrder1/:_id', {
                templateUrl: 'partials/job/serviceOrderCased.html'
                ,controller: 'JobServiceOrderCasedController'
            }).
            when('/jobInfoServiceOrderNew0/:_id', {
                templateUrl: 'partials/job/serviceOrderOpenForm.html'
                ,controller: 'JobServiceOrderOpenNewController'
            }).
            when('/jobInfoServiceOrderNew1/:_id', {
                templateUrl: 'partials/job/serviceOrderCasedForm.html'
                ,controller: 'JobServiceOrderCasedNewController'
            }).
            when('/jobInfoServiceOrderEdit0/:_id', {
                templateUrl: 'partials/job/serviceOrderOpenForm.html'
                ,controller: 'JobServiceOrderOpenEditController'
            }).
            when('/jobInfoServiceOrderEdit1/:_id', {
                templateUrl: 'partials/job/serviceOrderCasedForm.html'
                ,controller: 'JobServiceOrderCasedEditController'
            }).
            when('/jobInfoRTA/:_id', {
                templateUrl: 'partials/job/rta.html'
                ,controller: 'JobRTAController'
            }).
            when('/jobInfoRTANew/:_id', {
                templateUrl: 'partials/job/rtaForm.html'
                ,controller: 'JobRTANewController'
            }).
            when('/jobInfoRTAEdit/:_id', {
                templateUrl: 'partials/job/rtaForm.html'
                ,controller: 'JobRTAEditController'
            }).
            when('/jobInfoOutgoingTools0/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpen.html'
                ,controller: 'JobOutgoingToolsOpenController'
            }).
            when('/jobInfoOutgoingTools1/:_id', {
                templateUrl: 'partials/job/outgoingToolsCased.html'
                ,controller: 'JobOutgoingToolsCasedController'
            }).
            when('/jobInfoOutgoingTools0InspectionNew/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenInspectionForm.html'
                ,controller: 'JobOutgoingToolsOpenInspectionNewController'
            }).
            when('/jobInfoOutgoingTools1InspectionNew/:_id', {
                templateUrl: 'partials/job/outgoingToolsCasedInspectionForm.html'
                ,controller: 'JobOutgoingToolsCasedInspectionNewController'
            }).
            when('/jobInfoOutgoingTools0InspectionEdit/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenInspectionForm.html'
                ,controller: 'JobOutgoingToolsOpenInspectionEditController'
            }).
            when('/jobInfoOutgoingTools1InspectionEdit/:_id', {
                templateUrl: 'partials/job/outgoingToolsCasedInspectionForm.html'
                ,controller: 'JobOutgoingToolsCasedInspectionEditController'
            }).
            when('/jobInfoOutgoingTools0InspectionDetail/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenInspectionDetail.html'
                ,controller: 'JobOutgoingToolsOpenInspectionDetailController'
            }).
            when('/jobInfoOutgoingTools1InspectionDetail/:_id', {
                templateUrl: 'partials/job/outgoingToolsCasedInspectionDetail.html'
                ,controller: 'JobOutgoingToolsCasedInspectionDetailController'
            }).
            //============= OUTGOING IN OUT =========//
            when('/jobInfoOutgoingToolsInOutList/:_id', {
                templateUrl: 'partials/job/outgoingToolsInOutList.html'
                ,controller: 'JobOutgoingToolsInOutController'
            }).
            when('/jobInfoOutgoingToolsInOutNew/:_id', {
                templateUrl: 'partials/job/outgoingToolsInOutForm.html'
                ,controller: 'JobOutgoingToolsInOutNewController'
            }).
            when('/jobInfoOutgoingToolsInOutEdit/:_id', {
                templateUrl: 'partials/job/outgoingToolsInOutForm.html'
                ,controller: 'JobOutgoingToolsInOutEditController'
            }).
            when('/jobInfoOutgoingToolsInOutDetail/:_id', {
                templateUrl: 'partials/job/outgoingToolsInOutDetail.html'
                ,controller: 'JobOutgoingToolsInOutDetailController'
            }).
            //============= OUTGOING OPEN LEAK BAKER =========//
            when('/jobInfoOutgoingTools0LeakBakerList/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBakerList.html'
                ,controller: 'JobOutgoingToolsOpenLeakBakerController'
            }).
            when('/jobInfoOutgoingTools1LeakBakerList/:_id', {
                templateUrl: 'partials/job/outgoingToolsCasedLeakBakerList.html'
                ,controller: 'JobOutgoingToolsCasedLeakBakerController'
            }).
            when('/jobInfoOutgoingTools0LeakBakerNew/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBakerForm.html'
                ,controller: 'JobOutgoingToolsOpenLeakBakerNewController'
            }).
            when('/jobInfoOutgoingTools1LeakBakerNew/:_id', {
                templateUrl: 'partials/job/outgoingToolsCasedLeakBakerForm.html'
                ,controller: 'JobOutgoingToolsCasedLeakBakerNewController'
            }).
            when('/jobInfoOutgoingTools0LeakBakerEdit/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBakerForm.html'
                ,controller: 'JobOutgoingToolsOpenLeakBakerEditController'
            }).
            when('/jobInfoOutgoingTools1LeakBakerEdit/:_id', {
                templateUrl: 'partials/job/outgoingToolsCasedLeakBakerForm.html'
                ,controller: 'JobOutgoingToolsCasedLeakBakerEditController'
            }).
            when('/jobInfoOutgoingTools0LeakBakerDetail/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBakerDetail.html'
                ,controller: 'JobOutgoingToolsOpenLeakBakerDetailController'
            }).
            when('/jobInfoOutgoingTools1LeakBakerDetail/:_id', {
                templateUrl: 'partials/job/outgoingToolsCasedLeakBakerDetail.html'
                ,controller: 'JobOutgoingToolsCasedLeakBakerDetailController'
            }).
            
            when('/jobInfoOutgoingTools0LeakBergerList/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBergerList.html'
                ,controller: 'JobOutgoingToolsOpenLeakBergerController'
            }).
            when('/jobInfoOutgoingTools0LeakBergerNew/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBergerForm.html'
                ,controller: 'JobOutgoingToolsOpenLeakBergerNewController'
            }).
            when('/jobInfoOutgoingTools0LeakBergerEdit/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBergerForm.html'
                ,controller: 'JobOutgoingToolsOpenLeakBergerEditController'
            }).
            when('/jobInfoOutgoingTools0LeakBergerDetail/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBergerDetail.html'
                ,controller: 'JobOutgoingToolsOpenLeakBergerDetailController'
            }).
            
            when('/jobInfoOutgoingTools0LeakBurtonList/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBurtonList.html'
                ,controller: 'JobOutgoingToolsOpenLeakBurtonController'
            }).
            when('/jobInfoOutgoingTools0LeakBurtonNew/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBurtonForm.html'
                ,controller: 'JobOutgoingToolsOpenLeakBurtonNewController'
            }).
            when('/jobInfoOutgoingTools0LeakBurtonEdit/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBurtonForm.html'
                ,controller: 'JobOutgoingToolsOpenLeakBurtonEditController'
            }).
            when('/jobInfoOutgoingTools0LeakBurtonDetail/:_id', {
                templateUrl: 'partials/job/outgoingToolsOpenLeakBurtonDetail.html'
                ,controller: 'JobOutgoingToolsOpenLeakBurtonDetailController'
            }).
            
            
            when('/jobInfoJarSets/:_id', {
                templateUrl: 'partials/job/jarSets.html'
                ,controller: 'JobJarSetsController'
            }).
            when('/jobInfoJarSetsImpactOrderNew/:_id', {
                templateUrl: 'partials/job/jarSetsImpactOrderForm.html'
                ,controller: 'JobJarSetsImpactOrderNewController'
            }).
            when('/jobInfoJarSetsImpactOrderEdit/:_id', {
                templateUrl: 'partials/job/jarSetsImpactOrderForm.html'
                ,controller: 'JobJarSetsImpactOrderEditController'
            }).
            when('/jobInfoJarSetsImpactOrderDetail/:_id', {
                templateUrl: 'partials/job/jarSetsImpactOrderDetail.html'
                ,controller: 'JobJarSetsImpactOrderDetailController'
            }).
            
            when('/jobInfoJarSetsOpenHoleNew/:_id', {
                templateUrl: 'partials/job/jarSetsOpenHoleForm.html'
                ,controller: 'JobJarSetsOpenHoleNewController'
            }).
            when('/jobInfoJarSetsOpenHoleEdit/:_id', {
                templateUrl: 'partials/job/jarSetsOpenHoleForm.html'
                ,controller: 'JobJarSetsOpenHoleEditController'
            }).
            when('/jobInfoJarSetsOpenHoleDetail/:_id', {
                templateUrl: 'partials/job/jarSetsOpenHoleDetail.html'
                ,controller: 'JobJarSetsOpenHoleDetailController'
            }).
            
            
            when('/jobInfoOnSiteReport/:_id', {
                templateUrl: 'partials/job/onSiteReport.html'
                ,controller: 'JobOnSiteController'
            }).
            //============ DAILY JOB ==============//
            when('/jobInfoOnSiteDailyJobList/:_id', {
                templateUrl: 'partials/job/onSiteDailyJobList.html'
                ,controller: 'JobOnSiteDailyJobController'
            }).
            when('/jobInfoOnSiteDailyJobNew/:_id', {
                templateUrl: 'partials/job/onSiteDailyJobForm.html'
                ,controller: 'JobOnSiteDailyJobNewController'
            }).
            when('/jobInfoOnSiteDailyJobEdit/:_id', {
                templateUrl: 'partials/job/onSiteDailyJobForm.html'
                ,controller: 'JobOnSiteDailyJobEditController'
            }).
            when('/jobInfoOnSiteDailyJobDetail/:_id', {
                templateUrl: 'partials/job/onSiteDailyJobDetail.html'
                ,controller: 'JobOnSiteDailyJobDetailController'
            }).
            //============= SUMMARY DAILY JOB =========//
            when('/jobInfoOnSiteSummaryJobList/:_id', {
                templateUrl: 'partials/job/onSiteSummaryJobList.html'
                ,controller: 'JobOnSiteSummaryJobController'
            }).
            when('/jobInfoOnSiteSummaryJobNew/:_id', {
                templateUrl: 'partials/job/onSiteSummaryJobForm.html'
                ,controller: 'JobOnSiteSummaryJobNewController'
            }).
            when('/jobInfoOnSiteSummaryJobEdit/:_id', {
                templateUrl: 'partials/job/onSiteSummaryJobForm.html'
                ,controller: 'JobOnSiteSummaryJobEditController'
            }).
            when('/jobInfoOnSiteSummaryJobDetail/:_id', {
                templateUrl: 'partials/job/onSiteSummaryJobDetail.html'
                ,controller: 'JobOnSiteSummaryJobDetailController'
            }).
            //============== ISI TECH DATA SHEET =========//
            when('/jobInfoOnSiteTechDataNew/:_id', {
                templateUrl: 'partials/job/onSiteTechDataForm.html'
                ,controller: 'JobOnSiteTechDataNewController'
            }).
            when('/jobInfoOnSiteTechDataEdit/:_id', {
                templateUrl: 'partials/job/onSiteTechDataForm.html'
                ,controller: 'JobOnSiteTechDataEditController'
            }).
            when('/jobInfoOnSiteTechDataDetail/:_id', {
                templateUrl: 'partials/job/onSiteTechDataDetail.html'
                ,controller: 'JobOnSiteTechDataDetailController'
            }).
            //============= JSEA =========//
            when('/jobInfoOnSiteJSEAList/:_id', {
                templateUrl: 'partials/job/onSiteJSEAList.html'
                ,controller: 'JobOnSiteJSEAController'
            }).
            when('/jobInfoOnSiteJSEANew/:_id', {
                templateUrl: 'partials/job/onSiteJSEAForm.html'
                ,controller: 'JobOnSiteJSEANewController'
            }).
            when('/jobInfoOnSiteJSEAEdit/:_id', {
                templateUrl: 'partials/job/onSiteJSEAForm.html'
                ,controller: 'JobOnSiteJSEAEditController'
            }).
            when('/jobInfoOnSiteJSEADetail/:_id', {
                templateUrl: 'partials/job/onSiteJSEADetail.html'
                ,controller: 'JobOnSiteJSEADetailController'
            }).
            //============== CUSTOMER SATISFACTION =======//
            when('/jobInfoOnSiteCustomerNew/:_id', {
                templateUrl: 'partials/job/onSiteCustomerForm.html'
                ,controller: 'JobOnSiteCustomerNewController'
            }).
            when('/jobInfoOnSiteCustomerEdit/:_id', {
                templateUrl: 'partials/job/onSiteCustomerForm.html'
                ,controller: 'JobOnSiteCustomerEditController'
            }).
            when('/jobInfoOnSiteCustomerDetail/:_id', {
                templateUrl: 'partials/job/onSiteCustomerDetail.html'
                ,controller: 'JobOnSiteCustomerDetailController'
            }).
            //============= FIRST ALERT =========//
            when('/jobInfoOnSiteAlertList/:_id', {
                templateUrl: 'partials/job/onSiteAlertList.html'
                ,controller: 'JobOnSiteAlertController'
            }).
            when('/jobInfoOnSiteAlertNew/:_id', {
                templateUrl: 'partials/job/onSiteAlertForm.html'
                ,controller: 'JobOnSiteAlertNewController'
            }).
            when('/jobInfoOnSiteAlertEdit/:_id', {
                templateUrl: 'partials/job/onSiteAlertForm.html'
                ,controller: 'JobOnSiteAlertEditController'
            }).
            when('/jobInfoOnSiteAlertDetail/:_id', {
                templateUrl: 'partials/job/onSiteAlertDetail.html'
                ,controller: 'JobOnSiteAlertDetailController'
            }).
            //============= Calibration =========//
            when('/jobInfoOnSiteCalibrationList/:_id', {
                templateUrl: 'partials/job/onSiteCalibrationList.html'
                ,controller: 'JobOnSiteCalibrationController'
            }).
            //============== EXPENSE REPORT =======//
            when('/jobInfoExpenseReportNew/:_id', {
                templateUrl: 'partials/job/expenseReportForm.html'
                ,controller: 'JobExpenseReportNewController'
            }).
            when('/jobInfoExpenseReportEdit/:_id', {
                templateUrl: 'partials/job/expenseReportForm.html'
                ,controller: 'JobExpenseReportEditController'
            }).
            when('/jobInfoExpenseReport/:_id', {
                templateUrl: 'partials/job/expenseReportDetail.html'
                ,controller: 'JobExpenseReportDetailController'
            }).
            
            when('/jobInfoUpdateJar/:_id', {
                templateUrl: 'partials/job/updateJar.html'
                ,controller: 'JobDetailController'
            }).
            //============ GLOBAL MAP ============//
            when('/globalMap', {
                templateUrl: 'partials/globalMap/list.html'
                ,controller: 'GlobalMapController'
            }).
            //============ WELL ============//
            when('/well', {
                templateUrl: 'partials/well/list.html'
                ,controller: 'WellController'
            }).
            when('/wellNew', {
                templateUrl: 'partials/well/form.html'
                ,controller: 'WellNewController'
            }).
            when('/wellDetail/:_id', {
                templateUrl: 'partials/well/detail.html'
                ,controller: 'WellDetailController'
            }).
            when('/wellEdit/:_id', {
                templateUrl: 'partials/well/form.html'
                ,controller: 'WellEditController'
            }).
            //============ CONTACT ============//
            when('/contact', {
                templateUrl: 'partials/contact/list.html'
                ,controller: 'ContactController'
            }).
            when('/contactNew', {
                templateUrl: 'partials/contact/form.html'
                ,controller: 'ContactNewController'
            }).
            when('/contactDetail/:_id', {
                templateUrl: 'partials/contact/detail.html'
                ,controller: 'ContactDetailController'
            }).
            when('/contactEdit/:_id', {
                templateUrl: 'partials/contact/form.html'
                ,controller: 'ContactEditController'
            }).
            //============ COMPANY ============//
            when('/company', {
                templateUrl: 'partials/company/list.html'
                ,controller: 'CompanyController'
            }).
            when('/companyNew', {
                templateUrl: 'partials/company/form.html'
                ,controller: 'CompanyNewController'
            }).
            when('/companyDetail/:_id', {
                templateUrl: 'partials/company/detail.html'
                ,controller: 'CompanyDetailController'
            }).
            when('/companyEdit/:_id', {
                templateUrl: 'partials/company/form.html'
                ,controller: 'CompanyEditController'
            }).
            //============ ISI EMPLOYEE ============//
            when('/isiEmployee', {
                templateUrl: 'partials/isiEmployee/list.html'
                ,controller: 'ISIEmployeeController'
            }).
            when('/isiEmployeeDetail/:_id', {
                templateUrl: 'partials/isiEmployee/profile.html'
                ,controller: 'ISIEmployeeDetailController'
            }).
            //============ WORK LOG ============//
            when('/workLog', {
                templateUrl: 'partials/workLog/list.html'
                ,controller: 'WorkLogController'
            }).
            when('/workLog/:args', {
                templateUrl: 'partials/workLog/list.html'
                ,controller: 'WorkLogController'
            }).
            when('/workLogNewDaily', {
                templateUrl: 'partials/workLog/formDaily.html'
                ,controller: 'WorkLogNewDailyController'
            }).
            when('/workLogNewWeekly', {
                templateUrl: 'partials/workLog/formWeekly.html'
                ,controller: 'WorkLogNewWeeklyController'
            }).
            when('/workLogEditDaily/:_id', {
                templateUrl: 'partials/workLog/formDaily.html'
                ,controller: 'WorkLogEditDailyController'
            }).
            when('/workLogEditWeekly/:_id', {
                templateUrl: 'partials/workLog/formWeekly.html'
                ,controller: 'WorkLogEditWeeklyController'
            }).
            //============ USER MANAGEMENT ============//
            when('/user', {
                templateUrl: 'partials/user/list.html'
                ,controller: 'UserController'
            }).
            when('/userNew', {
                templateUrl: 'partials/user/form.html'
                ,controller: 'UserNewController'
            }).
            when('/userDetail/:_id', {
                templateUrl: 'partials/user/detail.html'
                ,controller: 'UserDetailController'
            }).
            when('/userEdit/:_id', {
                templateUrl: 'partials/user/form.html'
                ,controller: 'UserEditController'
            }).
            //============ ACCESS MANAGEMENT ============//
            when('/access', {
                templateUrl: 'partials/access/list.html'
                ,controller: 'AccessController'
            }).
            when('/accessNew', {
                templateUrl: 'partials/access/form.html'
                ,controller: 'AccessNewController'
            }).
            when('/accessDetail/:_id', {
                templateUrl: 'partials/access/detail.html'
                ,controller: 'AccessDetailController'
            }).
            when('/accessEdit/:_id', {
                templateUrl: 'partials/access/form.html'
                ,controller: 'AccessEditController'
            }).
            //============ EMPLOYEE MANAGEMENT ============//
            when('/employeeProfiles', {
                templateUrl: 'partials/employee/list.html'
                ,controller: 'EmployeeController'
            }).
            when('/employeeProfilesDetail/:_id', {
                templateUrl: 'partials/employee/profile.html'
                ,controller: 'EmployeeDetailController'
            }).
            when('/employeeProfilesNew', {
                templateUrl: 'partials/employee/profileForm.html'
                ,controller: 'EmployeeNewController'
            }).
            when('/employeeProfilesEdit/:_id', {
                templateUrl: 'partials/employee/profileForm.html'
                ,controller: 'EmployeeEditController'
            }).
            when('/employeeProfilesExperience/:_id', {
                templateUrl: 'partials/employee/experience.html'
                ,controller: 'EmployeeDetailExperienceController'
            }).
            when('/employeeProfilesActivityLog/:_id', {
                templateUrl: 'partials/employee/activityLog.html'
                ,controller: 'EmployeeDetailActivityLogController'
            }).
            //============ FORUM ============//
            when('/forum', {
                templateUrl: 'partials/forum/list.html'
                ,controller: 'ForumController'
            }).
            when('/forumTopicNew', {
                templateUrl: 'partials/forum/formTopic.html'
                ,controller: 'ForumTopicNewController'
            }).
            when('/forumTopicDetail/:_id', {
                templateUrl: 'partials/forum/detailTopic.html'
                ,controller: 'ForumTopicDetailController'
            }).
            when('/forumTopicEdit/:_id', {
                templateUrl: 'partials/forum/formTopic.html'
                ,controller: 'ForumTopicEditController'
            }).
            when('/forumPostEdit/:_id', {
                templateUrl: 'partials/forum/formPost.html'
                ,controller: 'ForumPostEditController'
            }).
            //============ PRICE MANAGER ============//
            when('/priceManagerDetail/:_id', {
                templateUrl: 'partials/priceManager/detail.html'
                ,controller: 'PriceManagerDetailController'
            }).
            when('/priceManagerEdit/:_id', {
                templateUrl: 'partials/priceManager/form.html'
                ,controller: 'PriceManagerEditController'
            }).
            //============= JAR MANAGER =============//
            when('/jarManager', {
                templateUrl: 'partials/jarManager/list.html'
                ,controller: 'JarManagerController'
            }).
            //============= JAR CASED LEAK BAKER =====//
            when('/jarManagerCasedLeakBakerList', {
                templateUrl: 'partials/jarManager/jarManagerCasedLeakBakerList.html'
                ,controller: 'JarManagerCasedLeakBakerController'
            }).
            when('/jarManagerCasedLeakBakerNew', {
                templateUrl: 'partials/jarManager/jarManagerCasedLeakBakerForm.html'
                ,controller: 'JarManagerCasedLeakBakerNewController'
            }).
            when('/jarManagerCasedLeakBakerEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerCasedLeakBakerForm.html'
                ,controller: 'JarManagerCasedLeakBakerEditController'
            }).
            when('/jarManagerCasedLeakBakerDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerCasedLeakBakerDetail.html'
                ,controller: 'JarManagerCasedLeakBakerDetailController'
            }).
            
            //============= JAR OPEN LEAK BAKER =====//
            when('/jarManagerOpenLeakBakerList', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBakerList.html'
                ,controller: 'JarManagerOpenLeakBakerController'
            }).
            when('/jarManagerOpenLeakBakerNew', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBakerForm.html'
                ,controller: 'JarManagerOpenLeakBakerNewController'
            }).
            when('/jarManagerOpenLeakBakerEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBakerForm.html'
                ,controller: 'JarManagerOpenLeakBakerEditController'
            }).
            when('/jarManagerOpenLeakBakerDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBakerDetail.html'
                ,controller: 'JarManagerOpenLeakBakerDetailController'
            }).
            
            //============= JAR OPEN LEAK BERGER =====//
            when('/jarManagerOpenLeakBergerList', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBergerList.html'
                ,controller: 'JarManagerOpenLeakBergerController'
            }).
            when('/jarManagerOpenLeakBergerNew', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBergerForm.html'
                ,controller: 'JarManagerOpenLeakBergerNewController'
            }).
            when('/jarManagerOpenLeakBergerEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBergerForm.html'
                ,controller: 'JarManagerOpenLeakBergerEditController'
            }).
            when('/jarManagerOpenLeakBergerDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBergerDetail.html'
                ,controller: 'JarManagerOpenLeakBergerDetailController'
            }).
            //============= JAR OPEN LEAK BURTON =====//
            when('/jarManagerOpenLeakBurtonList', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBurtonList.html'
                ,controller: 'JarManagerOpenLeakBurtonController'
            }).
            when('/jarManagerOpenLeakBurtonNew', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBurtonForm.html'
                ,controller: 'JarManagerOpenLeakBurtonNewController'
            }).
            when('/jarManagerOpenLeakBurtonEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBurtonForm.html'
                ,controller: 'JarManagerOpenLeakBurtonEditController'
            }).
            when('/jarManagerOpenLeakBurtonDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenLeakBurtonDetail.html'
                ,controller: 'JarManagerOpenLeakBurtonDetailController'
            }).
            //============= JAR OPEN INSPECTION =====//
            when('/jarManagerOpenInspectionList', {
                templateUrl: 'partials/jarManager/jarManagerOpenInspectionList.html'
                ,controller: 'JarManagerOpenInspectionController'
            }).
            when('/jarManagerOpenInspectionNew', {
                templateUrl: 'partials/jarManager/jarManagerOpenInspectionForm.html'
                ,controller: 'JarManagerOpenInspectionNewController'
            }).
            when('/jarManagerOpenInspectionEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenInspectionForm.html'
                ,controller: 'JarManagerOpenInspectionEditController'
            }).
            when('/jarManagerOpenInspectionDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerOpenInspectionDetail.html'
                ,controller: 'JarManagerOpenInspectionDetailController'
            }).
            //============= JAR CASED INSPECTION =====//
            when('/jarManagerCasedInspectionList', {
                templateUrl: 'partials/jarManager/jarManagerCasedInspectionList.html'
                ,controller: 'JarManagerCasedInspectionController'
            }).
            when('/jarManagerCasedInspectionNew', {
                templateUrl: 'partials/jarManager/jarManagerCasedInspectionForm.html'
                ,controller: 'JarManagerCasedInspectionNewController'
            }).
            when('/jarManagerCasedInspectionEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerCasedInspectionForm.html'
                ,controller: 'JarManagerCasedInspectionEditController'
            }).
            when('/jarManagerCasedInspectionDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerCasedInspectionDetail.html'
                ,controller: 'JarManagerCasedInspectionDetailController'
            }).
            //============= JAR IN OUT =====//
            when('/jarManagerInOutList', {
                templateUrl: 'partials/jarManager/jarManagerInOutList.html'
                ,controller: 'JarManagerInOutController'
            }).
            when('/jarManagerInOutList/:_id', {
                templateUrl: 'partials/jarManager/jarManagerInOutList.html'
                ,controller: 'JarManagerInOutController'
            }).
            when('/jarManagerInOutNew', {
                templateUrl: 'partials/jarManager/jarManagerInOutForm.html'
                ,controller: 'JarManagerInOutNewController'
            }).
            when('/jarManagerInOutEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerInOutForm.html'
                ,controller: 'JarManagerInOutEditController'
            }).
            when('/jarManagerInOutDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerInOutDetail.html'
                ,controller: 'JarManagerInOutDetailController'
            }).
            //============= JAR EQUIPMENT TRANSFER =====//
            when('/jarManagerTransferList', {
                templateUrl: 'partials/jarManager/jarManagerTransferList.html'
                ,controller: 'JarManagerTransferController'
            }).
            when('/jarManagerTransferNew', {
                templateUrl: 'partials/jarManager/jarManagerTransferForm.html'
                ,controller: 'JarManagerTransferNewController'
            }).
            when('/jarManagerTransferEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerTransferForm.html'
                ,controller: 'JarManagerTransferEditController'
            }).
            when('/jarManagerTransferDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerTransferDetail.html'
                ,controller: 'JarManagerTransferDetailController'
            }).
            //============= JAR EXPENSE REPORT =====//
            when('/jarManagerExpenseList', {
                templateUrl: 'partials/jarManager/jarManagerExpenseList.html'
                ,controller: 'JarManagerExpenseController'
            }).
            when('/jarManagerExpenseNew', {
                templateUrl: 'partials/jarManager/jarManagerExpenseForm.html'
                ,controller: 'JarManagerExpenseNewController'
            }).
            when('/jarManagerExpenseEdit/:_id', {
                templateUrl: 'partials/jarManager/jarManagerExpenseForm.html'
                ,controller: 'JarManagerExpenseEditController'
            }).
            when('/jarManagerExpenseDetail/:_id', {
                templateUrl: 'partials/jarManager/jarManagerExpenseDetail.html'
                ,controller: 'JarManagerExpenseDetailController'
            }).
            
            //============ Collaboration Tools ============//
            when('/collaborationTools', {
                templateUrl: 'partials/collaborationTools/list.html'
                ,controller: 'collaborationToolsController'
            }).
            when('/collaborationToolsFaq', {
                templateUrl: 'partials/collaborationTools/faq.html'
                ,controller: 'collaborationToolsFaqController'
            }).
            when('/collaborationToolsFaqForm', {
                templateUrl: 'partials/collaborationTools/faqForm.html'
                ,controller: 'collaborationToolsFaqFormController'
            }).
            when('/collaborationToolsGlossary', {
                templateUrl: 'partials/collaborationTools/glossary.html'
                ,controller: 'collaborationToolsGlossaryController'
            }).
            when('/collaborationToolsGlossaryForm', {
                templateUrl: 'partials/collaborationTools/glossaryForm.html'
                ,controller: 'collaborationToolsGlossaryFormController'
            }).
            when('/collaborationToolsManual', {
                templateUrl: 'partials/collaborationTools/manual.html'
                ,controller: 'collaborationToolsManualController'
            }).
            when('/collaborationToolsManualEdit/:_id', {
                templateUrl: 'partials/collaborationTools/manualEdit.html'
                ,controller: 'collaborationToolsManualEditController'
            }).
            //============ TOOLSTRING ============//
            when('/toolstring', {
                templateUrl: 'partials/toolstring/list.html'
                ,controller: 'ToolstringController'
            }).
            when('/toolstringNew', {
                templateUrl: 'partials/toolstring/form.html'
                ,controller: 'ToolstringNewController'
            }).
            when('/toolstringDetail/:_id', {
                templateUrl: 'partials/toolstring/detail.html'
                ,controller: 'ToolstringDetailController'
            }).
            when('/toolstringEdit/:_id', {
                templateUrl: 'partials/toolstring/form.html'
                ,controller: 'ToolstringEditController'
            }).
            
            otherwise({
                redirectTo: '/jobInfo'
            });

        //delete $httpProvider.defaults.headers.common['X-Requested-With'];

//        angular.extend(fileUploadProvider.defaults, {
//            // Enable image resizing, except for Android and Opera,
//            // which actually support image resizing, but fail to
//            // send Blob objects via XHR requests:
//            disableImageResize: /Android(?!.*Chrome)|Opera/
//                .test(window.navigator.userAgent),
//            maxFileSize: 5000000,
//            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
//        });
    }]);

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardApp.directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if(value && !/^(http):\/\//i.test(value)
                   && 'http://'.indexOf(value) === -1) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.push(ensureHttpPrefix);
        }
    };
});

dashboardApp.filter('formatText', function (){
	  return function(input) {
		    if(!input) return input;
		    var output = input
		      //replace possible line breaks.
		      .replace(/(\r\n|\r|\n)/g, '<br/>')
		      //replace tabs
		      .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
		      //replace spaces.
		      .replace(/ /g, '&nbsp;');
		      return output;
	  };
});

dashboardApp.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
    	var eventName = 'onRepeatLast';
    	if (attrs['eventName']) {
    		eventName = attrs['eventName'];
    	}
        if (scope.$last) setTimeout(function(){
            scope.$emit(eventName, element, attrs);
        }, 1);
    };
});

dashboardApp.filter("property", ["$filter", function($filter){
	var parseString = function(input){
		return input.split(".");
	}

	function getValue(element, propertyArray) {
		var value = element;
	
		angular.forEach(propertyArray, function(property) {
			if (value) {
				value = value[property];
			}
		});
	
		return value;
	}

	return function (array, propertyString, target) {
		var properties = parseString(propertyString);
	
		return $filter('filter')(array, function(item){
			return getValue(item, properties) == target;
		});
	}
}]);

dashboardApp.filter('roundPoint', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});

dashboardApp.directive('phonePicko', function ($compile) {
    return {
		restrict: 'A',
		require: 'ngModel',
		template: function(tElement, tAttrs) {
			var uid = "id_" + getRandomInt(0, 99999);
			var templateString = 
			'<div class="input-group" uid="' + uid + '">' +
			    '<input ng-if="' + uid + '" type="text" class="form-control" name="' + tAttrs.name + '" id="' + tAttrs.id + '" ng-model="' + tAttrs.ngModel + '" ng-maxlength="20" ng-pattern="REGEX_PHONE">' +
				'<input ng-if="!' + uid + '" type="text" ui-mask="(999) 999-9999" model-view-value="true" class="form-control" ng-model="' + tAttrs.ngModel + '">' +
				'<span class="input-group-addon">' +
					'<input type="checkbox" ng-model="' + uid + '"> Int.' +
				'</span>' +
			'</div>';
		    return templateString;
		},
		replace: true,
		link: function (scope, element, attrs, ngModelCtrl) {
			
			var properties = attrs.ngModel.split(".");
			var uid = attrs['uid'];
        	var value = scope;
        	angular.forEach(properties, function(property) {
    			if (value) {
    				value = value[property];
    			}
    		});
        	
        	if (value) {
        		var northAmericaPattern = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        		var match = northAmericaPattern.test(value);
        		if (!match) {
        			scope[uid] = true;
        		} else {
        			scope[uid] = false;
        		}
        	}
        	
		}
    };
});

dashboardApp.directive('datePicko', function ($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
        	var datePickHandler = $(element[0]).datepicker({
            	format: "mm/dd/yy",
            	weekStart: 1,
            	todayBtn: "linked",
                calendarWeeks: true,
                autoclose: true,
                todayHighlight: true});
        	var datePick = datePickHandler.data("datepicker");
        	// Set initial value
        	var properties = attrs.ngModel.split(".");
        	if (attrs['ngRepeatModel']) {
        		properties = attrs['ngRepeatModel'].split(".");
        	}
        	var value = scope;
        	angular.forEach(properties, function(property) {
    			if (value) {
    				value = value[property];
    			}
    		});
        	if (value && (typeof value != 'string' || value.length > 0)) {
        		datePick.setUTCDate(new Date(value * 1000));
        		ngModelCtrl.$setViewValue(value);
        	} else {
        		if (attrs['todayWhenEmpty'] && attrs['todayWhenEmpty'] != "false") {
        			var todayTime = Math.floor(new Date().getTime() / 1000);
        			var truncatedTodayTime = Math.floor(todayTime/86400)*86400;
        			datePick.setUTCDate(new Date(truncatedTodayTime * 1000));
            		ngModelCtrl.$setViewValue(truncatedTodayTime);
            	} else {
            		
            	}
        	}
        	
        	datePickHandler.on("change", function(e) {
        		// check the monitor lock on the attrib monitorLock
        		var syncLock = $(this).attr("sync-lock")
        		if (syncLock && syncLock == 'true') {
	        		// marked by syncLock do not emit changes back
        			var dateMiliSec = null;
	        		if (datePick.getUTCDate() != null) {
						dateMiliSec = datePick.getUTCDate().getTime() / 1000;
	        		}
	        		ngModelCtrl.$setViewValue(dateMiliSec);
        		} else {
        			var dateMiliSec = null;
	        		if (datePick.getUTCDate() != null) {
						dateMiliSec = datePick.getUTCDate().getTime() / 1000;
	        		}
					scope.$apply(function() {
						ngModelCtrl.$setViewValue(dateMiliSec);
					});
        		}
            });
        	
        	
        	// TODO : Need to think how if the ngModel is change in controller, it should update the date automatically,
        	// but right now the problem is that it will make recursive call, because it will call "change" event, 
        	// which "change" event will setViewValue of the ngModel, and then it gonna back calling update because we put watch
        	/*
        	scope.$watch(attrs.ngModel, function(newValue, oldValue) {
        		if (newValue !== oldValue) {
                	if (newValue) {
                		if (isNaN(newValue)) {
                			// format : mm/dd/yy
                			var dateValue = Date.parseExact(newValue, "MM/dd/yy");
                			datePick.update(dateValue);
                			ngModelCtrl.$setViewValue(dateValue.getTime() / 1000);
                		} else {
                			datePick.update(new Date(newValue * 1000));
                			ngModelCtrl.$setViewValue(newValue);
                		}
                	} else {
                		//datePick.update(new Date());
                		var a = "a";
                	}
        		}
        	});
        	*/
        	
        }
    };
});

dashboardApp.directive('uncheckableRadio', function ($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
        	var properties = attrs.ngModel.split(".");
        	if (attrs['ngRepeatModel']) {
        		properties = attrs['ngRepeatModel'].split(".");
        	}
        	var value = scope;
        	angular.forEach(properties, function(property) {
    			if (value) {
    				value = value[property];
    			}
    		});
    		if (!scope.radioButtonVar) {
        		scope.radioButtonVar = {};
        	}
    		if (value) {
    			scope.radioButtonVar[attrs.ngModel] = value;
    		}
        	var clickingCallback = function() {
        		var properties = attrs.ngModel.split(".");
            	if (attrs['ngRepeatModel']) {
            		properties = attrs['ngRepeatModel'].split(".");
            	}
            	var value = scope;
            	angular.forEach(properties, function(property) {
        			if (value) {
        				value = value[property];
        			}
        		});
        		if (!scope.radioButtonVar) {
            		scope.radioButtonVar = {};
            	}
            	if (scope.radioButtonVar[attrs.ngModel] && scope.radioButtonVar[attrs.ngModel] === value) {
            		delete scope.radioButtonVar[attrs.ngModel];
            		var valueToDel = scope;
            		var prop = "none";
            		angular.forEach(properties, function(property) {
            			if (valueToDel[property] !== null && typeof valueToDel[property] === 'object') {
            				valueToDel = valueToDel[property];
            			} else {
            				prop = property;
            			}
            		});
            		valueToDel[prop] = null;
            		scope.$apply();
            	} else {
            		scope.radioButtonVar[attrs.ngModel] = event.target.value;
            	}
    	    };
    	    element.bind('click', clickingCallback);
        }
    };
});

dashboardApp.directive('stringToNumber', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, element, attrs, ngModel) {
	      ngModel.$parsers.push(function(value) {
	        return '' + value;
	      });
	      ngModel.$formatters.push(function(value) {
	        return parseFloat(value, 10);
	      });
	    }
	  };
	});

dashboardApp.directive('onlyNum', function() {
    return function(scope, element, attrs) {

       var keyCode = [8,9,37,39,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
        element.bind("keydown", function(event) {
          //console.log("key entered in onlyNum: " + event.which);
          if($.inArray(event.which,keyCode) == -1) {
              scope.$apply(function(){
                  scope.$eval(attrs.onlyNum);
                  event.preventDefault();
              });
              event.preventDefault();
          }

      });
   };
});

dashboardApp.filter('ifEmpty', function() {
    return function(input, defaultValue) {
        if (angular.isUndefined(input) || input === null || ((typeof input === 'string' || input instanceof String) && input.trim() === '') ) {
            return defaultValue;
        }
        return input;
    }
});

