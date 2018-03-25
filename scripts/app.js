var app=angular.module('store',[]);

app.controller("StoreController",function($http,$scope){
	var gemProducts = this;
	$http.post('http://localhost:3000/retrieve')
		.then(function(response){
			gemProducts.products = response.data;
		},function(response){
			
		})
	this.products = gems;
});

app.controller("PanelController",function($scope){
	this.tab = 1;
	this.selectTab=function(setTab){
		this.tab=setTab;
	};
	this.isSelected=function(checkTab){
		return this.tab==checkTab;
	};
});

app.controller("ReviewController",function($scope){
	this.addReview = function(product){				
		if(this.review.stars!=undefined && this.review.stars!=""
			&& this.review.body!=undefined && this.review.body!=""
			&& this.review.author!=undefined && this.review.author!="")	
			product.reviews.push(this.review);
		this.review = {};
	};
});

var gems = [
{
	name: 'Dodecahedron',
	price: 2.9,
	description: 'Some gems have hidden qualities beyond their luster, beyond their shine. Dodecahedron is one of those gems.',
	canPurchase: true,
	images : [
		{
			full : 'images/dodecahedron-01-full.jpg',
			thumb: 'images/dodecahedron-02-full.jpg'
		}
	],
	reviews :[
		{
			stars	:	5,
			body	:	"I love this product.!!",
			author	:	"harshi@gmail.com"
		},
		{
			stars	:	3,
			body	:	"Improvements can be made. Not satisfactory",
			author	:	"chaitu@gmail.com"
		}
	]
},
{
	name: 'Pentagonal Gem',
	price: 5.95,
	description:'Origin of the Pentagonal gem is unknown, hence its low value. It has a very high shine and 12 sides however.',
	canPurchase: false,
	images : [
		{
			full : 'images/dodecahedron-02-full.jpg',
			thumb: 'images/dodecahedron-02-full.jpg'
		}
	],
	reviews :[
	
	]
}]