var gemDetails = [
	{
		name: 'Dodecahedron',
		price: 2.9,
		description: 'Some gems have hidden qualities beyond their luster, beyond their shine. Dodecahedron is one of those gems.',
		canPurchase: true,
		images : 'images/dodecahedron.jpg',
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
		images : 'images/pentagonal.jpg',
		reviews :[
		
		]
    }
];

module.exports = {gemDetails};