export class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  Paginate() {
    let page = this.queryString.page * 1 || 1;
    if (page <= 0) page = 1;
    const skip = (page - 1) * 5;
    this.query = this.query.skip(skip).limit(5);
    return this;
  }

  Find() {
    const filter = (requestQuery) => {
      const returnedObj = {};
      const excludedFilds = ['page', 'sort', 'fields', 'keyword'];
      for (const fieled in requestQuery) {
        if (!excludedFilds.includes(fieled)) {
          returnedObj[fieled] = requestQuery[fieled];
        }
      }
      return returnedObj;
    };

    let queryObj = filter(this.queryString);
    // filtering with dollar sign

    queryObj = JSON.stringify(queryObj).replace(
      /\b(gt|lt|gte|lte)\b/g,
      (matched) => `$${matched}`
    );
    queryObj = JSON.parse(queryObj);

    // query itself
    this.query = this.query.find(queryObj);
    return this;
  }

  Sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortedBy);
    }
    return this;
  }
  //search
  Search() {
    if (this.queryString.keyword) {
      this.query = this.query.find({
        $or: [
          { name: { $regex: this.queryString.keyword, $options: 'i' } },
          { description: { $regex: this.queryString.keyword, $options: 'i' } },
        ],
      });
    }
    return this;
  }

  // select
  Select() {
    if (this.queryString.fields) {
      let selected = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(selected);
    }
    return this;
  }
}
