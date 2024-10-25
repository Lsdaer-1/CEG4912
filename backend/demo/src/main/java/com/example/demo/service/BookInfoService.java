package com.example.demo.service;

import com.example.demo.entity.BookInfo;
import com.example.demo.entity.UserInfo;
import com.example.demo.repository.BookInfoRepository;
import com.example.demo.repository.UserInfoRepository;

import java.util.List;
import java.util.Optional;

public class BookInfoService {
    private BookInfoRepository bookInfoRepository;

    public BookInfo saveBook(BookInfo bookInfo) {
        return bookInfoRepository.save(bookInfo);
    }


    public Optional<BookInfo> getBookByName(String name){
        return bookInfoRepository.findById(name);
    }
    public List<BookInfo> getAllBooksByName(String name) {
        return bookInfoRepository.findByName(name);
    }

    public void deleteBookByName(String name){
        bookInfoRepository.deleteById(name);
    }

    public BookInfo updateBook(String name, BookInfo updatedBookInfo) {
        Optional<BookInfo> existingBook = bookInfoRepository.findById(name);
        if (existingBook.isPresent()) {
            BookInfo book = existingBook.get();
            book.setBookDetail(updatedBookInfo.getBookDetail());
            book.setBorrowDate(updatedBookInfo.getBorrowDate());
            return bookInfoRepository.save(book);
        } else {
            throw new RuntimeException("User not found with email: " + name);
        }
    }
}
