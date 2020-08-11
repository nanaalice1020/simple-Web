/*
 * @Author: Jinna
 * @Date:   2016-05-22 20:39:21
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-10-11 15:39:18
 */

'use strict';


window.onload = function() {


	$("nav#mainNav ul li a").hover(function() { //导航栏淡入淡出效果
		$(this).fadeTo(100, 0.5);
		$(this).fadeTo(500, 1.0);
	}, function() {
		$(this).fadeTo(100, 1.0);
	});

	indexPageFunc(); //初始加载首页
	$("div#mainContainer").on("click", "p#more", articlePageFunc); //给more按钮绑定跳转事件

	$("li#indexPage").click(indexPageFunc);
	$("li#articlePage").click(articlePageFunc); //导航栏跳转事件
	$("li#photoPage").click(photoPageFunc);
};

function indexPageFunc() { //选中导航栏、删除原内容、加载新内容
	choosenNav("indexPage");
	deletePage();
	dataAndLoad(loadIndexPage);
}

function articlePageFunc() {
	choosenNav("articlePage");
	deletePage();
	dataAndLoad(loadArticlePage);
}

function photoPageFunc() {
	choosenNav("photoPage");
	deletePage();
	photoAndLoad(loadPhotoPage);
}

function dataAndLoad(loadFunc) { //从json获取日志内容用于加载指定页面
	var url = "http://www.nana1020.cn/data/articles.json?time=new Date()";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.send(null);
	request.onload = function() {
		if (request.status == 200) {
			loadFunc(request.responseText);
		}
	}
}

function photoAndLoad(loadFunc) { //从json获取z照片路径用于加载PHOTO
	var urls = "http://www.nana1020.cn/data/photos.json?time=new Date()";
	var request1 = new XMLHttpRequest();
	request1.open("GET", urls);
	request1.send(null);
	request1.onload = function() {
		if (request1.status == 200) {
			loadFunc(request1.responseText);
		}
	}
}

function deletePage() { //删除原内容
	$("div#mainContainer").text("");
	$("div#mainContainer").empty();
}

function choosenNav(choosenPage) { //选中导航栏添加选中类
	$("nav#mainNav ul li").each(function() {
		$(this).removeClass("selectedPage");
	});

	$("li#" + choosenPage).attr("class", "selectedPage");
}


function loadIndexPage(responseText) { //主页显示近期日志
	$("div#mainContainer").append("<div id=\"mypic\"></div>");
	$("div#mypic").append("<a href=\"imgs/nana.jpg\" target=\"_blank\"><img src=\"imgs/nana_low.jpg\"  width=100%></img></a>");
	$("div#mainContainer").append("<h3>Education</h3>");
	$("div#mainContainer").append("<p>Visting Ph.D supported by CSC (November 2019 - ), Dept. of Electrical & Computer Engineering, University of Victoria, Victoria, Canada</p>");
	$("div#mainContainer").append("<p>Doctor of Philosophy (July 2015 - ), Information and Communication Engineering, Xidian University, Xi'an, China</p>");
	$("div#mainContainer").append("<p>Bachelor of Engineering (September 2011 - July 2015), Information Security, Xidian University, Xi'an, China</p>");
	$("div#mainContainer").append("<h3>Publications and Conference </h3>");
	$("div#mainContainer").append("<ol><li><strong>Jinna Hu</strong>, Chen Chen, Tie Qiu, Qingqi Pei, \"Regional-Centralized Content Dissemination for eV2X services in 5G mmWave-enabled IoVs\", IEEE Internet of Things Journal</li><li>Chen Chen, <strong>Jinna Hu</strong>, Tie Qiu, Mohammed Atiquzzaman, Zhiyuan Ren, \"CVCG Cooperative V2V-Aided Transmission Scheme Based on Coalitional Game for Popular Content Distribution in Vehicular Ad-Hoc Networks\" IEEE Transactions on Mobile Computing, Volume 18, 2019.</li><li><strong>Jinna Hu</strong>, Chen Chen, Lei Liu, \"Popular Content Distribution Scheme with Cooperative Transmission Based on Coalitional Game in VANETs\" to be presented in 21st International Symposium on Wireless Personal Multimedia Communications (WPMC 2018).</li><li>Chen Chen, Tie Qiu, <strong>Jinna Hu</strong>, Zhiyuan Ren, Yang Zhou, Arun Kumar Sangaiah, \"A congestion avoidance game for information exchange on intersections in heterogeneous vehicular networks\" Journal of Network and Computer Applications, Volume 85, 2017.</li><li>Chen Chen, <strong>Jinna Hu</strong>, Jisheng Sui, Yang Zhou, \"An information congestion control scheme in the Internet of Vehicles: A bargaining game approach\" Computers and Electrical Engineering, Volume 58, 2017. </li><li>Chen Chen, <strong>Jinna Hu</strong>, Jianfeng Zhang, Canding Sun, \"Information Congestion Control on Intersections in VANETs: A Bargaining Game Approach\" to be presented in IEEE VTC-Spring 2016.</li></ol>");
	
	



	var articles = JSON.parse(responseText);
	var mainContainerDiv = document.getElementById("mainContainer");
	for (var i = 0; i < Math.min(2, articles.length); i++) { //展示最近两篇
		var article = articles[i];
		var newSection = document.createElement("section");
		newSection.setAttribute("class", "diarySection");
		mainContainerDiv.appendChild(newSection);

		var newHeader = document.createElement("header");
		newHeader.innerHTML = article.header;
		newSection.appendChild(newHeader);
		if (article.picture != "") {
			var newlink = document.createElement("a");
			newlink.setAttribute("href",article.picture);
			newlink.setAttribute("target","blank");
			var newdiarypic = document.createElement("img");
			newdiarypic.setAttribute("src", article.picture);
			newSection.appendChild(newlink);
			newlink.appendChild(newdiarypic);
		}

		for (var j = 0; j < article.content.length; j++) {
			var newContent = document.createElement("p");
			newContent.innerHTML = article.content[j];
			newSection.appendChild(newContent);
		}
	}

	var newMore = document.createElement("p"); //给日志创建段落
	newMore.setAttribute("id", "more");
	var newMoreA = document.createElement("a");
	newMoreA.setAttribute("href", "#");
	newMoreA.innerHTML = "more >>";
	mainContainerDiv.appendChild(newMore);
	newMore.appendChild(newMoreA);

}

function loadPhotoPage(responseText) { //加载photo页面，简单，待写相册等
	$("div#mainContainer").append("<table id=\"photoTable\"></table>");
	var photoAddrs = JSON.parse(responseText); 
	if (photoAddrs.length) {
		for (var i = 0; i < photoAddrs.length; i++) {
        if (i%3 == 0) {
        	$("table#photoTable").append("<tr id=\"line"+Math.floor(i/3)+"\"> </tr>");
        }
        $("tr#line"+Math.floor(i/3)).append("<td><div class=\"photoBlock\"><a href=\"imgs\/"+ photoAddrs[i] +"\" target=\"_blank\"><img src=\"imgs\/"+ photoAddrs[i] +"\" width=150px></img></a></div></td>");
		// <td><div class=\"photoBlock\"><img src=\"imgs\/"+ photoAddrs[i*3] +"\" width=150px></div></td><td><div class=\"photoBlock\"><img src=\"imgs\/"+ photoAddrs[i*3+1] +"\" width=150px></div></td><td><div class=\"photoBlock\"><img src=\"imgs\/"+ photoAddrs[i*3+2] +"\" width=150px></div></td>
	 }
	}
}

function loadArticlePage(responseText) { //加载日志列表页面
	$("div#mainContainer").append("<ul id=\"ListPage\"></ul>")
	$("div#mainContainer").append("<ul id=\"diaryList\"></ul>"); //日志列表获取
	var titles = JSON.parse(responseText);
	var diaryListUl = document.getElementById("diaryList");
	for (var i = 0; i < Math.ceil(titles.length/10); i++) {
		$("ul#ListPage").append("<li id=\""+(i+1)+"page\">"+(i+1)+"</li>");
		//$("ul#ListPage").on("click", "li#"+(i+1)+"page", clickPage($(this).attr("id"),titles));
		$("ul#ListPage").on("click", "li#"+(i+1)+"page", function(){
		var listpage = parseInt($(this).attr("id"));
		$("ul#diaryList").text("");
		$("ul#diaryList").empty();
		for (var i = (listpage-1)*10; i < listpage*10; i++) {
		if (i==titles.length) {
			break;
		}
		
		$("ul#diaryList").append("<li id="+i+"+\"num\">"+titles[i].header+"</li>")
	}

	$("div#mainContainer").on("mouseenter", "ul li a", function() { //鼠标悬停效果
		$(this).fadeTo(100, 0.5);
		$(this).fadeTo(500, 1.0);
	});
	$("div#mainContainer").on("mouseleave", "ul li a", function() {
		$(this).fadeTo(100, 1.0);
	});

	$("ul#diaryList").unbind('click').on("click", "li", {
		texts: titles
	}, showBoard); //点击展开日志的效果
		});

	}

	$("li#1page").click();

}

// function clickPage(listpageID,titles){
// 		var listpage = parseInt(listpageID);
// 		$("ul#diaryList").text("");
// 		$("ul#diaryList").empty();
// 		for (var i = (listpage-1)*10; i < listpage*10; i++) {
// 		if (i==titles.length) {
// 			break;
// 		}
		
// 		$("ul#diaryList").append("<li id="+i+"+\"num\">"+titles[i].header+"<li>")
// 	}

// 	$("div#mainContainer").on("mouseenter", "ul li a", function() { //鼠标悬停效果
// 		$(this).fadeTo(100, 0.5);
// 		$(this).fadeTo(500, 1.0);
// 	});
// 	$("div#mainContainer").on("mouseleave", "ul li a", function() {
// 		$(this).fadeTo(100, 1.0);
// 	});

// 	$("ul#diaryList").on("click", "li", {
// 		texts: titles
// 	}, showBoard); //点击展开日志的效果
// }



	





function showBoard(event) {

	if ($(this).attr("id")==$("li.opened").attr("id"))
	{
	$("div.diaryBoard").text(""); //收起之前展开的日志
	$("div.diaryBoard").remove();
	$("li.opened").removeClass("opened");
	}else
	{
	$("div.diaryBoard").text(""); //收起之前展开的日志
	$("div.diaryBoard").remove();
	$("li.opened").removeClass("opened");
	var datas = event.data.texts; //获取标题对应日志并展开
	var diaryNum = parseInt($(this).attr("id"));
	var diary = datas[diaryNum];
	var diaryp = "";
	for (var i = 0; i < diary.content.length; i++) {
		diaryp += "<p>" + diary.content[i] + "</p>";
	}
	var diarypic = "";
	if (diary.picture != "") {
		diarypic = "<a href=\"imgs\/"+ diary.picture +"\" target=\"_blank\"><img src=\"" + diary.picture + "\"></img></a>";
	}
	$(this).addClass("opened");
	$(this).after("<div class = \"diaryBoard\">" + diarypic + diaryp + "</div>");	
	}
}

