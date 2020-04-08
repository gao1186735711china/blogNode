$(function(){
	//设置登录和注册互斥显示
	
	$loginBox = $("#loginBox");
	$registerBox = $("#registerBox");

	$loginBox.find("a").on("click", function(){
		$registerBox.show();
		$loginBox.hide();
		return false;
	})

	$registerBox.find("a").on("click", function(){
		$registerBox.hide();
		$loginBox.show();
		return false;
	})


	//注册
	$registerBox.find("button").on("click", function(){
		//点击注册按钮的，通过ajax的post请求发送数据
		
		$.ajax({
			type: 'POST',
			url: "/api/user/register",
			data: {
				username: $registerBox.find("[name=username]").val(),
				password: $registerBox.find("[name=password]").val(),
				repassword: $registerBox.find("[name=repassword]").val()
			},
			success: function(result){
				// console.log(result);
				$registerBox.find(".colWarning").html(result.message);
				if(!result.code){
					//注册成功
					
					setTimeout(function(){
						$registerBox.hide();
						$loginBox.show();
					}, 1000);
				}
			},
			error: function(error){
				console.log("请求错误：" + error);
			}
		})
		
	})	

	//登录
	$loginBox.find("button").on("click", function(){
		//通过ajax提交数据
		$.ajax({
			type: "POST",
			url: "/api/user/login",
			data: {
				username: $loginBox.find("[name=username]").val(),
				password: $loginBox.find("[name=password]").val()
			},
			success: function(result){
				// console.log(result);
				$loginBox.find(".colWarning").html(result.message);

				setTimeout(function(){
					location.reload();
				}, 1000);
			},
			error: function(error){
				console.log("请求错误：" + error);
			}
		})
	})

})
























