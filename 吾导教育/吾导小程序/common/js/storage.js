/*
* 项目前缀，避免冲突
*/ 
const _FIX = '';
/*
**
* 设置存储
*/
const setStorage = (opt) => {
    opt = opt || {};
    opt.key = opt.key || '';
    opt.data = opt.data || '';
    opt.success = opt.success || function () {};
    opt.fail = opt.fail || function () {};
	
	uni.setStorage({
		key: _FIX+opt.key,
		data: opt.data,
		success:function(){
			opt.success();
		},
		fail:function(){
			opt.fail();
		}
	})
}


/*
**
* 获取存储
*/
const getStorage = (opt) => {
    opt = opt || {};
    opt.key = opt.key || '';
    opt.success = opt.success || function () {};
    opt.fail = opt.fail || function () {};
    opt.complete = opt.complete || function () {};
	uni.getStorage({
		key: _FIX+opt.key,
		success:function(res){
			opt.success(res);
		},
		fail:function(){
			opt.fail();
		},
		complete:function(){
			opt.complete();
		}
	})
}
/*
**
* 删除指定存储
*/
const remove = (key) => {
	uni.removeStorageSync(_FIX+key);
}
/*
**
* 删除所有存储
*/
const clear = () => {
	uni.clearStorage()
}

export {
	setStorage,
	getStorage,
	remove,
	clear
}