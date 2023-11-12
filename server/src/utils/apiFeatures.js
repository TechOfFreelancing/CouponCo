class SqlApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword;

        const query = keyword
            ? {
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { type: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            }
            : {};

        this.query = this.query.where(query);
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        // Removing some fields specific to your store schema
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        // Convert field values to case-insensitive regex
        const regexFields = ["type"]; // Add more fields as needed
        regexFields.forEach((key) => {
            if (queryCopy[key]) {
                queryCopy[key] = { $regex: queryCopy[key], $options: "i" };
            }
        });


        // Apply the constructed query object
        this.query = this.query.where(queryCopy);

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).offset(skip);
        return this;
    }
}

module.exports = SqlApiFeatures;