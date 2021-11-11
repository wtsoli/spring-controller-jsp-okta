(function(){
    console.log("Hello World!");
    
    // Bootstrap the AuthJS Client
	const authClient = new OktaAuth({
	  // Org URL
	  url: 'https://dev-02201558.okta.com',
	  issuer: 'https://dev-02201558.okta.com',
	  // OpenID Connect APP Client ID
	  clientId: '0oa2kv4rh3Wy1mUYq5d7',
	  // Trusted Origin Redirect URI
	  redirectUri: 'http://localhost:8080/hello'
	});
	
	if (authClient.isLoginRedirect()) {
	  // Parse token from redirect url
	  authClient.token.parseFromUrl()
	    .then(data => {
	      const { idToken, accessToken } = data.tokens;
	      console.log(`Hi ${idToken.claims.email}!`);
	      // Store parsed token in Token Manager
	      authClient.tokenManager.add('idToken', idToken);
	      authClient.tokenManager.add('accessToken', accessToken);
	      console.log(idToken);
	    });
	} else {
	  // Attempt to retrieve ID Token from Token Manager
	  authClient.tokenManager.get('accessToken')
	    .then(accessToken => {
	      console.log(accessToken);
	      if (accessToken) {
	        console.log(`Hi ${accessToken}!`);
	      } else {
	        var username = prompt('What is your username?');
	        var password = prompt('What is your password?');
	
	        authClient.signInWithCredentials({username, password})
	          .then(transaction => {
	            if (transaction.status === 'SUCCESS') {
	              authClient.token.getWithRedirect({
	                sessionToken: transaction.sessionToken,
	                responseType: 'token'
	              });
	            }
	          });
	      }
	    });
	}
	
	setTimeout(() => 
		{
		  console.log("refresh the token");
		  // Attempt to retrieve ID Token from Token Manager
		  authClient.tokenManager.renew('accessToken'); // magic to refresh accessToken
		  authClient.tokenManager.get('accessToken')
		    .then(accessToken => {
		      console.log("current accessToken: ", accessToken);
		      if (accessToken) {
		        console.log(`Timedout to refresh: Hi ${accessToken.accessToken}!`);
		      } else {
		        var username = prompt('What is your username?');
		        var password = prompt('What is your password?');
		
		        authClient.signInWithCredentials({username, password})
		          .then(transaction => {
		            if (transaction.status === 'SUCCESS') {
		              authClient.token.getWithRedirect({
		                sessionToken: transaction.sessionToken,
		                responseType: 'token'
		              });
		            }
		          });
		      }
		    });
			
		}, 10000);
    
})();