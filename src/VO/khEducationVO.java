package VO;

import java.util.Date;

public class khEducationVO {
	private int education_no; // 학력 구분자(index)
	private int education_apply_no; // 이력서 no(FK)
	private String education_school_type; // 학교 구분
	private String education_school_name; // 학교명
	private String education_major; // 전공
	private float education_grade; // 학점
	private Date education_enter_date; // 입학일
	private Date education_graduate_date; // 졸업일
	private String education_graduate_status; // 졸업상태

	public int getEducation_no() {
		return education_no;
	}

	public void setEducation_no(int education_no) {
		this.education_no = education_no;
	}

	public int getEducation_apply_no() {
		return education_apply_no;
	}

	public void setEducation_apply_no(int education_apply_no) {
		this.education_apply_no = education_apply_no;
	}

	public String getEducation_school_type() {
		return education_school_type;
	}

	public void setEducation_school_type(String education_school_type) {
		this.education_school_type = education_school_type;
	}

	public String getEducation_school_name() {
		return education_school_name;
	}

	public void setEducation_school_name(String education_school_name) {
		this.education_school_name = education_school_name;
	}

	public String getEducation_major() {
		return education_major;
	}

	public void setEducation_major(String education_major) {
		this.education_major = education_major;
	}

	public float getEducation_grade() {
		return education_grade;
	}

	public void setEducation_grade(float education_grade) {
		this.education_grade = education_grade;
	}

	public Date getEducation_enter_date() {
		return education_enter_date;
	}

	public void setEducation_enter_date(Date education_enter_date) {
		this.education_enter_date = education_enter_date;
	}

	public Date getEducation_graduate_date() {
		return education_graduate_date;
	}

	public void setEducation_graduate_date(Date education_graduate_date) {
		this.education_graduate_date = education_graduate_date;
	}

	public String getEducation_graduate_status() {
		return education_graduate_status;
	}

	public void setEducation_graduate_status(String education_graduate_status) {
		this.education_graduate_status = education_graduate_status;
	}

}
