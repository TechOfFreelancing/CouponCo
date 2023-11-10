class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {

        const keyword = this.queryStr.keyword;

        const query = keyword
            ? {
                $and: [
                    {
                        $or: [
                            { pName: { $regex: keyword, $options: "i" } },
                            { name: { $regex: keyword, $options: "i" } }
                        ]
                    }
                ]
            }
            : {};


        this.query = this.query.find(query);
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // Convert field values to case-insensitive regex
        const regexFields = ["city", "Address", "status", "country", "state", "propertyType"]; // Add more fields as needed
        regexFields.forEach((key) => {
            if (queryCopy[key]) {
                queryCopy[key] = { $regex: queryCopy[key], $options: "i" };
            }
        });

        // Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));

        const filterQuery = {};

        if (queryCopy.isVerified === 'false') {
            filterQuery['brokersDetails.isVerified'] = false;
        }

        if (queryCopy.paymentStatus === 'false') {
            filterQuery['brokersDetails.paymentStatus'] = false;
        }

        // Apply the constructed query object
        this.query = this.query.find(filterQuery);


        return this;
    }


    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;