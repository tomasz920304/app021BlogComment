import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogComment } from 'src/app/shared/entities/blogComment.entity';
import { BlogCommentService } from 'src/app/shared/services/blogComment.service';

@Component({
  selector: 'app-blogComment',
  templateUrl: './blogComment.component.html',
  styles: [
  ]
})
export class BlogCommentComponent implements OnInit {

  formModel: FormGroup;
  get _content() {
    return this.formModel.get('content');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogCommentService: BlogCommentService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formModel = this.formBuilder.group({
      id: [0],
      content: ['', Validators.required],
    });

    //update
    if (this.blogCommentService._tempBlogComment) {

      let result = this.blogCommentService._tempBlogComment;
      this.formModel.patchValue(result);
    }
  }

  insertBlogComment() {
    this.blogCommentService.postBlogComment(this.formModel.value as BlogComment).subscribe(
      responce => {
        //this.blogCommentService.refreshCommentList();
        this.toastr.success('Submitted successfully', 'Done');
        console.log("Success", responce);
        this.router.navigate(["../blogComment-list"], { relativeTo: this.route });
      },
      error => {
        this.toastr.error('Error', 'Blog comment');
        console.log("Error", error);
      }
    );
  }

  updateBlogComment(){
    this.blogCommentService.putBlogComment(this.formModel.value as BlogComment).subscribe(
      responce => {
        //this.blogCommentService.refreshCommentList();
        this.blogCommentService._tempBlogComment = null;
        this.toastr.success('Updated successfully', 'Done');
        console.log("Success", responce);
        this.router.navigate(["../blogComment-list"], { relativeTo: this.route });
      },
      error => {
        this.toastr.error('Look into console log', 'Error');
        console.log("Error", error);
      }
    );
  }

  onSubmit() {
    if (!this.blogCommentService._tempBlogComment)
      this.insertBlogComment();
    else
      this.updateBlogComment();
  }
}
