package VO;

public class khReviewVO {
	private int review_no; // ���� ��ȣ
	private int review_post_no; // ����� �޸� ������ �۹�ȣ
	private String review_writer; // �ۼ���
	private String review_content; // ����

	public int getReview_no() {
		return review_no;
	}

	public void setReview_no(int review_no) {
		this.review_no = review_no;
	}

	public int getReview_post_no() {
		return review_post_no;
	}

	public void setReview_post_no(int review_post_no) {
		this.review_post_no = review_post_no;
	}

	public String getReview_writer() {
		return review_writer;
	}

	public void setReview_writer(String review_writer) {
		this.review_writer = review_writer;
	}

	public String getReview_content() {
		return review_content;
	}

	public void setReview_content(String review_content) {
		this.review_content = review_content;
	}

}
