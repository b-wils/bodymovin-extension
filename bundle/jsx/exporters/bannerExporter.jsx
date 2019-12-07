/*jslint vars: true , plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global bm_eventDispatcher, bm_generalUtils, bm_downloadManager, File, $*/

$.__bodymovin.bm_bannerExporter = (function () {

	var bm_eventDispatcher = $.__bodymovin.bm_eventDispatcher;
	var bm_downloadManager = $.__bodymovin.bm_downloadManager;
    var JSON = $.__bodymovin.JSON;
	var ob = {};
	var lottiePaths = []

	function getLottiePath(bannerConfig) {
		var sourcePath = '';
		if (bannerConfig.lottie_origin === 'local' || bannerConfig.lottie_origin === 'cdnjs') {
			var i = 0, len = lottiePaths.length;
			while ( i < len) {
				if(lottiePaths[i].value === bannerConfig.lottie_library) {
					sourcePath = lottiePaths[i][bannerConfig.lottie_origin];
				}
				i += 1;
			}
		} else {
			sourcePath = bannerConfig.lottie_path
		}
		return sourcePath;
	}

	function createTemplate(config, destinationPath) {
		var bannerConfig = config.banner
		var templateData = bm_downloadManager.getTemplateData()
		var filePathName = destinationPath.substr(destinationPath.lastIndexOf('/') + 1);

		templateData = templateData
		.replace(/__CONTENT_WIDTH__/g, bannerConfig.width)
		.replace(/__CONTENT_HEIGHT__/g, bannerConfig.height)
		.replace(/__LOTTIE_RENDERER__/g, bannerConfig.lottie_renderer)
		.replace(/__LOTTIE_SOURCE__/g, getLottiePath(bannerConfig))
		.replace(/__FILE_PATH__/g, filePathName)

		var htmlDestinationPath = destinationPath.replace(filePathName,'index.html');
		var dataFile = new File(htmlDestinationPath);
		dataFile.open('w', 'TEXT', '????');
		dataFile.encoding = 'UTF-8';
		dataFile.write(templateData);
		dataFile.close();
	}

	function save(stringData, destinationPath, config, callback) {
		createTemplate(config, destinationPath)
		var dataFile = new File(destinationPath);
		dataFile.open('w', 'TEXT', '????');
		dataFile.encoding = 'UTF-8';
		dataFile.write(stringData);
		dataFile.close();

		callback();
	}

	function setLottiePaths(paths) {
		lottiePaths = paths
	}

	ob.save = save;
	ob.setLottiePaths = setLottiePaths
    
    return ob;
}());