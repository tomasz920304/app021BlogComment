import { BlogComment } from './../entities/blogComment.entity';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogCommentService {

  url = environment.url+ "comments";

  _tempBlogComment: BlogComment = null;

  // blogCommentList: BlogComment[];

  constructor(private http: HttpClient) { }

  getBlogCommentList() {
    return this.http.get<BlogComment[]>(this.url)
  }

  postBlogComment(blogComment: BlogComment): Observable<BlogComment> {
    return this.http.post<BlogComment>(this.url, blogComment);
  }

  putBlogComment(blogComment: BlogComment): Observable<BlogComment> {
    return this.http.put<BlogComment>(`${this.url}/${blogComment.id}`, blogComment);
  }

  deleteBlogComment(id: number): Observable<BlogComment> {
    return this.http.delete<BlogComment>(`${this.url}/${id}`);
  }

  // refreshCommentList() {
  //   this.http.get<BlogComment[]>(this.url)
  //     .toPromise()
  //     .then(res => this.blogCommentList = res as BlogComment[]);
  // }
}