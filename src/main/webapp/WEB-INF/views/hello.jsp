<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello ${name}!</title>
    <link href="${contextPath}/resources/css/main.css" rel="stylesheet">
    <script src="https://global.oktacdn.com/okta-auth-js/4.5.0/okta-auth-js.min.js" type="text/javascript"></script>
    
</head>
<body>
    <h2 class="hello-title">Hello ${name}!</h2>
    <script src="${contextPath}/resources/js/main.js"></script>
</body>
</html>
