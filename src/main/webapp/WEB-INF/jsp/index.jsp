<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html data-ng-app="11st">
<head>
    <title>11번가 대시보드</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
    
    <link rel="stylesheet" href="/lib/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="/lib/sb-admin-2/css/plugins/metisMenu/metisMenu.min.css" />
    <link rel="stylesheet" href="/lib/sb-admin-2/css/sb-admin-2.css" />
    <link rel="stylesheet" type="text/css" media="all" href="/lib/font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/lib/bootstrap-calendar/css/calendar.css" />
    <link rel="stylesheet" href="/css/common.css" />
    <link rel="stylesheet" href="/css/modal.css" />
    <link rel="stylesheet" href="/css/menu.css" />
</head>
<body>
    <section id="wrapper">
        <header data-ng-include data-src="'/views/common/menu.html'"></header>
        <section class="page-wrapper" id="page-wrapper" data-ui-view></section>        
    </section>
    
<script>
window.sessionToken = '';

if(window.sessionToken == ''){
	location.href = '/#/login/login';
}

</script>
<script src="/lib/jquery/jquery.min.js"></script>
<script src="/lib/jquery-ui/jquery-ui.min.js"></script>
<script src="/lib/ng-file-upload/angular-file-upload-shim.js"></script>	
<script src="/lib/angular/angular.js"></script>
<script src="/lib/angular-animate/angular-animate.js"></script>
<script src="/lib/ng-file-upload/angular-file-upload.js"></script>
<script src="/lib/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/lib/angular-bootstrap/ui-bootstrap.min.js"></script>
<script src="/lib/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="/lib/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="/lib/angular-resource/angular-resource.min.js"></script>
<script src="/lib/angular-ui-sortable/sortable.min.js"></script>
<script src="/lib/sb-admin-2/js/plugins/metisMenu/metisMenu.min.js"></script>
<script src="/lib/sb-admin-2/js/sb-admin-2.js"></script>

<!-- angular basic application -->
<script src="/js/init.js"></script>
<script src="/js/routes/route.js"></script>

<!-- angular controllers -->
<script src="/js/controllers/menu.js"></script>
<script src="/js/controllers/login.js"></script>

<!-- angular directive -->

<!-- angular services -->
<script src="/js/services/notifier.js"></script>
<script src="/js/services/menu.js"></script>
<script src="/js/services/loading.js"></script>
<script src="/js/services/viewLoader.js"></script>
</body>
</html>