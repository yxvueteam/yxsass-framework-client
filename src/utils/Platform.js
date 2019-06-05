

var Platform = {

	getSystemInfo:(callback)=>{
		mpvue.getSystemInfo({
			success: (res) => {
				callback(res)
			}
		})
	},

	stopRefresh:()=>{
		mpvue.stopPullDownRefresh();
	},

	showLoading:(isShow,info)=> {
		if ( info === undefined && isShow ) {
			info = "正在努力加载数据中...."
		}
		if ( isShow ) {
			mpvue.showLoading( {
				title:info,
				mask:true,
			} );
		} else {
			mpvue.hideLoading()
			if ( info !== undefined ) {
				Platform.toast( info, 2 );
			}
		}
	},

	toast:(info,time)=>{
		if(time == undefined){
			time = 2;
		}
		mpvue.showToast({
			title: info,
			icon: "none",
			duration: time*1000
		})
	},

	showConfirmDialog:(title,content,confirmEvent)=>{
		mpvue.showModal({
			title: title,
			content: content,
			success: function (res) {
				if (res.confirm) {
					if(confirmEvent !== undefined){
						confirmEvent()
					}
				}
			}
		})
	}

}

export default Platform