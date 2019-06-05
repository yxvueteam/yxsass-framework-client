

var Platform = {

	getSystemInfo:(callback)=>{
		wx.getSystemInfo({
			success: (res) => {
				callback(res)
			}
		})
	},

	stopRefresh:()=>{
		wx.stopPullDownRefresh();
	}

}

export default Platform