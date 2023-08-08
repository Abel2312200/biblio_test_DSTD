/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) : Promise<Book>  {
    return this.booksRepository.save(createBookDto);
  }

  findAll() : Promise<Book[]>  {
    return this.booksRepository.find();
  }

  findOne(id: number) : Promise<Book|null> {
    return this.booksRepository.findOneBy({id});
  }

  update(id: number, updateBookDto: UpdateBookDto) :  Promise<Book> {
    this.booksRepository.update(id, updateBookDto);
    return this.findOne(id);  
  }

  remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
