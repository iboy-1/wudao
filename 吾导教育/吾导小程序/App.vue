<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function(options) {
			console.log(options)
			if (options.scene == 1007) {
					console.log(options.scene)
			      // 通过单人聊天会话分享进入
			    }
			    if (options.scene == 1008) {
					console.log(options.scene)
			      // 通过群聊会话分享进入
			    }
			    if (options.scene == 1001) {
					console.log(options.scene)
			      // 通过发现栏小程序进入
			    }
			var timer_id = 0;
			if (typeof window != 'undefined') {
				if (window.innerWidth > 750) {
					window.innerWidth = 750;
					timer_id = setInterval(function() {
						//适配尺寸
						var el = document.querySelector('html');
						var n = Number(el.style.fontSize.replace('px', ''));
						if (n > 30) {
							el.style.fontSize = '30px';
							clearInterval(timer_id);
						}
					}, 100);
				}
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
	
<style>
	/*每个页面公共css */
</style>
