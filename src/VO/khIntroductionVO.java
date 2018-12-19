package VO;

public class khIntroductionVO {
	private int introduction_no; // 자소서 식별자
	private int introduction_apply_no; // 자소서가 추가 될 이력서 no
	private String introduction_content; // 자소서 내용

	public int getIntroduction_no() {
		return introduction_no;
	}

	public void setIntroduction_no(int introduction_no) {
		this.introduction_no = introduction_no;
	}

	public int getIntroduction_apply_no() {
		return introduction_apply_no;
	}

	public void setIntroduction_apply_no(int introduction_apply_no) {
		this.introduction_apply_no = introduction_apply_no;
	}

	public String getIntroduction_content() {
		return introduction_content;
	}

	public void setIntroduction_content(String introduction_content) {
		this.introduction_content = introduction_content;
	}

}
