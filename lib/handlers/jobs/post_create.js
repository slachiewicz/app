const getOwners = require('./helpers/get_owners.js');

module.exports = function (request, reply) {
 
  getOwners(function (errOwners, owners) {
     // $lab:coverage:off$
    if (errOwners) {
      console.log(errOwners);
    }
    // $lab:coverage:on$

    var owner = {};
    owners.forEach(function (ownerObj) {
      if (ownerObj.id === request.payload.id) {
        owner.id = ownerObj.id; 
        owner.firstName = ownerObj.firstName;
        owner.lastName = ownerObj.lastName;
      } 
    });

    var categories = {};

    if (typeof request.payload.categories === "string") {
      categories.data = [request.payload.categories]; 
    } else {
      categories.data = request.payload.categories.map(id => {return {id: id}});
    }
    categories.total = categories.data.length;

    var businessSectors = {};

    if (typeof request.payload.businessSectors === "string") {
      businessSectors.data = [request.payload.businessSectors];
    } else {
      businessSectors.data = request.payload.businessSectors.map(id => {return {id: id}});
    }
   
    businessSectors.total = businessSectors.data.length;

    var address = {};
    address.city = request.payload.city;
    address.countryID = request.payload.countryId;

    var jobObj = {
      title: request.payload.title,
      employmentType: request.payload.employmentType,
      owner: owner,
      customText1: request.payload.customText1,
      customText2: request.payload.customText2,
      customText3: request.payload.customText3,
      customTextBlock1: request.payload.customTextBlock1,
      customText5: request.payload.customText5,
      customText6: request.payload.customText6,
      customText7: request.payload.customText7,
      customText8: request.payload.customText8,
      customTextBlock2: request.payload.customTextBlock2,
      customText11: request.payload.customText11,
      startDate: request.payload.startDate,
      dateEnd: request.payload.dateEnd,
      salary: request.payload.salary,
      payRate: request.payload.payRate,
      customText12: request.payload.customText12,
      categories: categories,
      businessSectors: businessSectors,
      description: request.payload.description,
      address: address,
      dateAdded: Date.now()
    }

    console.log(jobObj.startDate);
    console.log(jobObj.dateEnd);

    return reply(jobObj);
  }); 
}
