var express = require('express');
var router = express.Router();
const { BOOK_MASTER } = require("../utils/libraryConstants");

/* GET Books listing. */
router.get('/all', function(req, res, next) {
    const bookMaster = BOOK_MASTER;
    res.json(bookMaster);
});

router.post('/new', function(req, res) {
    const responseObj = {
        isError: false,
        errorMessage: "",
        books: []
    };
    console.log(req.body);
    const bookData = req.body;

    const allBooksData = BOOK_MASTER;

    const bookObj = {
        title: bookData.bookName,
        caption: bookData.bookCaption,
        authorName: bookData.author,
        bookSeriesName: bookData.seriesName
    };

    let maxBookId = 0;
    const matchedBookName = allBooksData.find(book => (bookObj.title || '').toLowerCase() === (book.title || '').toLowerCase());
    if (matchedBookName) {
        responseObj.isError = true;
        responseObj.errorMessage = "Book Name Already Exists";
        res.json(responseObj);
        return;
    }
    allBooksData.forEach(book => maxBookId = Math.max(maxBookId, book.bookId));
    bookObj.bookId = maxBookId + 1;

    const matchedBook = allBooksData.find(book => bookObj.bookSeriesName && (bookObj.bookSeriesName || '').toLowerCase() === (book.bookSeriesName || '').toLowerCase());
    if (matchedBook) {
        bookObj.bookSeriesId = matchedBook.bookSeriesId;
        bookObj.authorName = matchedBook.authorName;
        bookObj.authorId = matchedBook.authorId;
    } else {
        // Come here if book series doesn't match
        bookObj.bookSeriesId = bookObj.bookSeriesName ? bookObj.bookSeriesName.split(" ").join("#") : undefined;

        const matchedAuthor = allBooksData.find(book => (bookObj.authorName || '').toLowerCase() === (book.authorName || '').toLowerCase());

        if (matchedAuthor) {
            bookObj.authorName = matchedAuthor.authorName;
            bookObj.authorId = matchedAuthor.authorId;
        } else {
            bookObj.authorId = bookObj.authorName.split(" ").join("#")
        }
    }

    allBooksData.push(bookObj);
    responseObj.books = allBooksData;
    res.json(responseObj);
});

/**
 * 5 Types of HTTP Requests
 *      GET -> Used to get a resource
 *      POST -> Used to create a new resource
 *      PUT -> Used to update a resource
 *      DELETE -> Used to delete a resource
 *      PATCH -> Used to update partial data in the resource
 */

module.exports = router;
