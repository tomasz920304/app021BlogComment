import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogComment } from 'src/app/shared/entities/blogComment.entity';
import { BlogCommentService } from 'src/app/shared/services/blogComment.service';

@Component({
  selector: 'app-blogComment-list',
  templateUrl: './blogComment-list.component.html',
  styles: [
  ]
})
export class BlogCommentListComponent implements OnInit {

  blogCommentList: BlogComment[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogCommentService: BlogCommentService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.blogCommentService.refreshCommentList();
    this.blogCommentService.getBlogCommentList().subscribe(
      responce => {
        this.blogCommentList = responce;
        console.log("Success", responce);
      },
      error => {
        this.toastr.error('Look into console log', 'Error');
        console.log("Error", error);
      }
    );
  }

  onEdit(blogComment: BlogComment) {
    this.blogCommentService._tempBlogComment = blogComment;
    this.router.navigate(["../blogComment"], { relativeTo: this.route });
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this comment?')) {
      this.blogCommentService.deleteBlogComment(id).subscribe(
        responce => {
          this.toastr.success('Deleted successfully', 'Blog comment');
          console.log("Success", responce);
          this.ngOnInit();
        },
        error => {
          this.toastr.error('Look into console log', 'Error');
          console.log("Error", error);
        }
      );
    }
  }
}
