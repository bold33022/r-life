/**
 *
 * r-life
 *
 * @description
 *
 * @version 2018/08/01 初始版本。
 *
 * @author ace
 *
 * @see <a href="http://requirejs.org/">RequireJS</a>
 *
 * @see <a href="https://jquery.com/">jQuery</a>
 *
 * @see <a href="http://underscorejs.org/">Underscore.js</a>
 * @see <a href="https://github.com/jashkenas/underscore">jashkenas/underscore: JavaScript's utility _ belt</a>
 * @see <a href="http://backbonejs.org/">Backbone.js</a>
 * @see <a href="https://github.com/jashkenas/backbone">jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events</a>
 * @see <a href="https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites">Tutorials, blog posts and example sites · jashkenas/backbone Wiki</a>
 *
 * @see <a href="https://getbootstrap.com/">Bootstrap · The most popular HTML, CSS, and JS library in the world.</a>
 *
 * @comment
 *
 * @todo
 *
 */

Configurations.loadJS(Configurations.requirejsFile, function() {

	requirejs.config(tw.ace33022.RequireJSConfig);

	requirejs(["tw.ace33022.util.browser.FormUtils", "tw.ace33022.util.browser.ReUtils"], function(FormUtils, ReUtils) {

		jQuery(document).ready(function() {

			function playVideo(source) {

				var videoSrcOption;
				var row = jQuery('<div class="row" style="height: 100%;"></div>');
				var col = jQuery('<div class="col" style="height: 100%;"></div>');
				var iframe = jQuery('<iframe style="width: 100%; height: 100%;"></iframe>');

				if (typeof source === 'string') {

					videoSrcOption = {"type": "video/mp4", "src": source};
				}
				else if (typeof source.name === 'string') {

					if (source.type === 'video/mp4') {

						videoSrcOption = {"type": "video/mp4", "src": URL.createObjectURL(source)};
					}
				}

				if (typeof videoSrcOption !== 'undefined') {

					if (videoSrcOption["src"].search(/openload.co/i) !== -1) {

						jQuery('body').css('overflow', 'hidden');

						iframe.on('load', function(e) {});

						iframe.attr('scrolling', 'no');
						iframe.attr('frameborder', '0');
						iframe.attr('marginwidth', '0');
						iframe.attr('marginheight', '0');

						iframe.attr('src', videoSrcOption["src"]);

						col.append(iframe).appendTo(row);

						jQuery('#' + divLifeAreaId).empty().append(row);
					}
					else {

						requirejs(["tw.ace33022.util.browser.VideoUtils"], function(VideoUtils) {

							var videoId = 'video' + Math.random().toString(36).substr(2, 6);
							var videojs;

							var options = {

								"hotkeys": {

									"seekStep": 10,
									"volumeStep": 0.1
								}
							};

							var tag = '<div class="row" style="height: 100%;">'
											+	'  <div id="work-area" class="col" style="height: 100%;">'
											+ '    <video id="' + videoId + '" preload="none" />'
											+ '  </div>'
											+ '</div>';
							jQuery('#' + divLifeAreaId).empty().append(tag);

							videojs = VideoUtils.getVideojs(videoId, options);

							videojs.volume(0.5);
							videojs.src(videoSrcOption);

							videojs.play();
						});
					}
				}
			}

			var inpSearchId = 'inpSearch' + Math.random().toString(36).substr(2, 6);
			var btnSearchId = 'btnSearch' + Math.random().toString(36).substr(2, 6);
			var divLifeAreaId = 'divLifeArea' + Math.random().toString(36).substr(2, 6);

			var params = ReUtils.getURLParameters();
			var arrImg = new Array();

			var tag = '<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">'
							+ '  <div class="container-fluid">'
							+ '    <div class="navbar-header">'
							+ '      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-navbar-collapse">'
							+ '        <span class="sr-only">Toggle navigation</span>'
							+ '        <span class="icon-bar"></span>'
							+ '        <span class="icon-bar"></span>'
							+ '        <span class="icon-bar"></span>'
							+ '      </button>'
							+ '      <a class="navbar-brand" href="#">Random Life</a>'
							+ '    </div>'
							+ '    <div id="bs-navbar-collapse" class="collapse navbar-collapse">'
							+ '      <ul class="nav navbar-nav">'
							+ '        <li><a href="#">Category</a></li>'
							+ '        <li><a href="#">Actress</a></li>'
							+ '        <li class="navbar-form" role="search">'
							+ '          <div class="input-group">'
							+ '            <input type="text" class="form-control" id="' + inpSearchId + '" placeholder="Search" value="" />'
							+ '            <span class="input-group-btn">'
							+ '              <button type="button" class="btn" id="' + btnSearchId + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>'
							+ '            </span>'
							+ '          </div>'
						  + '        </li>'
							+ '      </ul>'
							+ '    </div>'
							+ '  </div>'
							+ '</nav>';

			jQuery('body').append(tag);

			jQuery('body').append('<div class="container-fluid" id="' + divLifeAreaId + '" style="padding-top: 50px; height: 100%;"></div>');

			window.addEventListener('beforeunload', function(event) {

				var confirmationMessage = 'Abort playing video?';

				if ((jQuery('#' + divLifeAreaId).find('video').length !== 0) || (jQuery('#' + divLifeAreaId).find('iframe').length !== 0)) {

					event.returnValue = confirmationMessage;
				}

				return confirmationMessage;
			});

			jQuery(window).on('focus', function(event) {

				if ((jQuery('.modal-open').length == 0) && (jQuery('.modal-backdrop').length == 0)) {

					jQuery('#' + inpSearchId).focus();

					jQuery('#' + divLifeAreaId).find('video').focus();
					jQuery('#' + divLifeAreaId).find('iframe').focus();
				}
			});

			jQuery(window).on('blur', function(event) {

				// pause video player?
			});

			// 這個寫法只有在轉換瀏覽器的Tab時才有作用，轉換不同程式時則無用！？
			document.addEventListener('visibilitychange',

				function() {

					// console.log(document.visibilityState);

					if (!document.hidden) jQuery(window).trigger('focus');
				},
				false
			);

			jQuery('#' + inpSearchId).on('focus', function(event) { jQuery(this).select(); });

			jQuery('#' + btnSearchId).on('click', function(event) { if (jQuery('#' + inpSearchId).val() != '') window.location.href = window.location.origin + window.location.pathname + '?' + 'search=' + jQuery('#' + inpSearchId).val(); });

			jQuery('#' + inpSearchId).on('keydown', function(event) { if (event.keyCode == 13) jQuery('#' + btnSearchId).trigger('click'); });

			jQuery('#bs-navbar-collapse > ul > li:eq(0)').on('click', function(event) {

				event.preventDefault();

				requirejs(["jasny-rowlink"], function() {

					var selItem;

					var modalId = 'modal' + Math.random().toString(36).substr(2, 6);

					FormUtils.showProgressbar(

						'Loading‧‧‧',
						function(closeProgressbar) {

							var url = 'https://script.google.com/macros/s/AKfycbyZDbEK4W8Xfxm5iznnq68_zCd5qa2Ubf-__E4zksiHTsMmKPI/exec';

							var tag = '<div class="modal fade" tabindex="-1" role="dialog" id="' + modalId + '">'
											+ '  <div class="modal-dialog" style="width: 90%;" role="document">'
											+ '    <div class="modal-content">'
											+ '      <div class="modal-body">'
											+ '        <table class="table table-hover">'
											+ '          <tbody class="rowlink"></tbody>'
											+ '        </table>'
											+ '      </div>'
											+ '      <div class="modal-footer">'
											+ '        <div class="text-center">'
											+ '          <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>'
											+ '        </div>'
											+ '      </div>'
											+ '    </div>'
											+ '  </div>'
											+ '</div>';
							jQuery(tag).appendTo('body');

							jQuery('#' + modalId).on('show.bs.modal', function() {

								jQuery(this).find('th').css('border', 'none');
								jQuery(this).find('td').css('border', 'none');
							});

							jQuery('#' + modalId).on('hidden.bs.modal', function() {

								if (typeof selItem !== 'undefined') {

									window.location.href = window.location.origin + window.location.pathname + '?' + 'search=' + selItem;
								}
							});

							jQuery.getJSON(url, function(data, textStatus, jqXHR) {

								var tag = '';

								data.forEach(function(currentValue, index) {

									tag += '<tr><td style="text-align: center;">' + currentValue["category_name"] + '</td></tr>';
								});

								jQuery('#' + modalId).find('tbody').append(tag);

								jQuery('#' + modalId).find('td').on('click', function(event) {

									selItem = jQuery(event.toElement).text();

									jQuery('#' + modalId).modal('hide');
								});

								closeProgressbar();
							});
						},
						function() {

							jQuery('#' + modalId).modal('show');
						}
					);
				});
			});

			jQuery('#bs-navbar-collapse > ul > li:eq(1)').on('click', function(event) {

				event.preventDefault();

				requirejs(["wordcloud", "underscore"], function(wordcloud) {

					var selItem;

					var modalId = 'modal' + Math.random().toString(36).substr(2, 6);

					FormUtils.showProgressbar(

						'Loading‧‧‧',
						function(closeProgressbar) {

							var url = 'https://script.google.com/macros/s/AKfycbywYzx-2qX5GbWFLXnGjhjNYnJEH7404d-uh_aNH_PXbhii22Ye/exec';

							var tag = '<div class="modal fade" tabindex="-1" role="dialog" id="' + modalId + '">'
											+ '  <div class="modal-dialog" role="document">'
											+ '    <div class="modal-content">'
											+ '      <div class="modal-body">'
											+ '        <canvas></canvas>'
											+ '      </div>'
											+ '      <div class="modal-footer">'
											+ '        <button type="button" class="btn btn-primary center-block" data-dismiss="modal">取消</button>'
											+ '      </div>'
											+ '    </div>'
											+ '  </div>'
											+ '</div>';
							jQuery(tag).appendTo('body');

							jQuery('#' + modalId).on('show.bs.modal', function() {

								jQuery(this).find('.modal-dialog').css('width', '100%');
								jQuery(this).find('.modal-dialog').css('height', 'auto');
								jQuery(this).find('.modal-dialog').css('margin', 0);
								jQuery(this).find('.modal-dialog').css('padding', 0);

								jQuery(this).find('.modal-content').css('min-height', '100%');

								jQuery(this).find('canvas').css('width', '100%');
							});

							jQuery('#' + modalId).on('hidden.bs.modal', function() {

								if (typeof selItem !== 'undefined') {

									window.location.href = window.location.origin + window.location.pathname + '?' + 'search=' + selItem;
								}
							});

							jQuery.getJSON(url, function(data, textStatus, jqXHR) {

								var prop;
								var fontSize;
								var arrData = new Array();

								for (prop in data) {

									fontSize = 8;

									if (data[prop] >= 20) {

										fontSize = 24;
									}
									else if (data[prop] >= 10) {

										fontSize = 16;
									}

									arrData.push([prop, fontSize]);
								}

								arrData = _.sortBy(arrData, function(arr){ return arr[1]; });

								arrData.reverse();

								wordcloud(jQuery('#' + modalId).find('canvas')[0], {

									"list": arrData,
									"click": function(item, dimension, event) {

										selItem = item[0];

										jQuery('#' + modalId).modal('hide');
									},
									"rotateRatio": 0.5,
									"rotationSteps": 2,
								});

								closeProgressbar();
							});
						},
						function() {

							jQuery('#' + modalId).modal('show');
						}
					);
				});
			});

			jQuery('.navbar-brand').attr('href', window.location.origin + window.location.pathname);

			if ((typeof params["video_code"] !== 'undefined') && (document.referrer !== '')) {

				FormUtils.showMarqueebar(

					'讀取影片播放資料‧‧‧',
					function(closeMarqueebar) {

						var url = 'https://script.google.com/macros/s/AKfycbyvLw2uJUZm5ygy8SpuYxRwaAtUTePulwOzmjjpYnpYveDejI2_/exec?video_code=' + params["video_code"] + '&confirm=' + document.referrer;

						jQuery.getJSON(url, function(data, textStatus, jqXHR) {

							closeMarqueebar();

							if (data["error_code"] === 0) {

								playVideo(data["uri"]);
							}
							else {

								FormUtils.showMessage('無法取得影片播放資料！', function() {

									window.location.href = window.location.origin + window.location.pathname;
								});
							}
						});
					}
				);
			}
			else {

				FormUtils.showLoadingEffect(

					function(closeLoadingEffect) {

						var url = 'https://script.google.com/macros/s/AKfycbztxaQLHiCGNsn6Oil7nl-o1fOhUHBTWR3DG87KJvJa7m45B2Q/exec';

						if (typeof params["search"] !== 'undefined') {

							url += '?' + 'search' + '=' + params["search"];

							jQuery('#' + inpSearchId).val(params["search"]);
						}

						jQuery.getJSON(url, function(data, textStatus, jqXHR) {

							requirejs(["jquery.unveil"], function() {

								var row;

								for (var key in data) {

									data[key].forEach(function(currentValue, index) {

										var img = jQuery('<img></img>');

										img.addClass('img-thumbnail');

										img.attr('alt', currentValue["video_name"]);
										img.attr('src', 'data:image/png;base64,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');

										img.attr('data-src', currentValue["poster"]);
										img.attr('data-video_code', currentValue["video_code"]);
										img.attr('data-short_url', currentValue["short_url"]);

										arrImg.push(img);
									});
								}

								if (arrImg.length === 0) {

									closeLoadingEffect();

									FormUtils.showMessage('查無資料！！', function() {window.location.href = window.location.origin + window.location.pathname;});
								}
								else {

									arrImg.forEach(function(element, index) {

										var div = jQuery('<div class="subject-item col-sm-3"></div>');
										var a = jQuery('<a></a>').append(element);

										// a.attr('href', element.attr('data-short_url'));
										a.attr('href', 'http://zo.ee/16172033/' + window.location.origin + window.location.pathname + '?video_code=' + element.attr('data-video_code'));
										a.attr('title', element.attr('alt'));

										a.append('<div>' + element.attr('alt') + '</div>');

										if ((index % 4) === 0) row = jQuery('<div class="row"></div>');

										div.append(a).appendTo(row);

										if (((index % 4) === 3) || (index === (arrImg.length - 1))) jQuery(row).appendTo('#' + divLifeAreaId);
									});

									jQuery('img').unveil();

									jQuery('.subject-item')
									.on('click', function(e) {

										var modalId = 'modalSuject' + Math.random().toString(36).substr(2, 6);
										var self = jQuery(this);
										var video_code;

										var tag = '<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-hidden="true">'
														+ '  <div class="modal-dialog" style="width: 90%;">'
														+ '    <div class="modal-content">'
														+ '      <div class="modal-header">'
														+ '        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'
														+ '        <h4 class="modal-title">' + jQuery(this).find('img').attr('alt') + '</h4>'
														+ '      </div>'
														+ '      <div class="modal-body" style="text-align: center;">'
														+ '        <img class="img-thumbnail" src="' + jQuery(this).find('img').attr('src') + '">'
														+ '      </div>'
														+ '      <div class="modal-footer">'
														+ '        <button type="button" class="btn btn-primary">View</button>'
														+ '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
														+ '      </div>'
														+ '    </div>'
														+ '  </div>'
														+ '</div>';

										if (jQuery('.navbar-toggle').is(':visible') === false) {

											e.preventDefault();

											jQuery(tag).appendTo('body');

											jQuery('#' + modalId + ' .modal-footer .btn-primary').on('click', function(e) {

												video_code = self.find('img').attr('data-video_code');

												jQuery('#' + modalId).modal('hide');
											});

											jQuery('#' + modalId).on('hidden.bs.modal', function(e) {

												jQuery('#' + modalId + ' .modal-footer .btn-primary').off('click');

												jQuery('#' + modalId).remove();

												if (typeof video_code !== 'undefined') {

													window.location.href = self.find('a').attr('href');
												}
											});

											jQuery('#' + modalId).modal('show');
										}
									});

									closeLoadingEffect();
								}
							});
						});	// end getJSON
					}
				);	// end showLoadingEffect
			}
		});
	});
});