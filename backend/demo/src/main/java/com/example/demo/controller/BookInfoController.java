package com.example.demo.controller;

import com.example.demo.entity.BookInfo;
import com.example.demo.entity.UserInfo;
import com.example.demo.repository.BookInfoRepository;
import com.example.demo.service.BookInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping("/api/books")
public class BookInfoController {

    private BookInfoService bookInfoService;

    @PostMapping("/save")
    public ResponseEntity<BookInfo> saveBook(@RequestBody BookInfo bookInfo) {
        BookInfo savedBook = bookInfoService.saveBook(bookInfo);
        return ResponseEntity.ok(bookInfo);
    }


    @DeleteMapping("/deleteBook/{name}")
    public ResponseEntity<Void> deleteBookByName(@PathVariable String name) {
        bookInfoService.deleteBookByName(name);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/updateBook/{name}")
    public ResponseEntity<BookInfo> updateBook(@PathVariable String name, @RequestBody BookInfo updatedBookInfo) {
        BookInfo updatedBook = bookInfoService.updateBook(name, updatedBookInfo);
        return ResponseEntity.ok(updatedBook);
    }
    @GetMapping("/getBook/{name}")
    public ResponseEntity<BookInfo> getBookByName(@PathVariable String name) {
        Optional<BookInfo> book = bookInfoService.getBookByName(name);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<BookInfo>> getAllBooksByName(String name) {
        List<BookInfo> books = bookInfoService.getAllBooksByName(name);
        return ResponseEntity.ok(books);
    }
}
