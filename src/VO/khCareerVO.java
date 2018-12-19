package VO;

import java.util.Date;

public class khCareerVO {
	private int career_no; // 식별자
	private int career_apply_no; // 경력내역이 추가 될 이력서No
	private String career_company_name; // 회사명
	private String career_department; // 부서명
	private Date career_enter_date; // 입사일
	private Date career_leave_date; // 퇴사일
	private String career_position; // 직책
	private String career_job; // 직무
	private int career_pay; // 연봉
	private String career_job_explan; // 담당업무
	private int career_duration; // 경력
	private String career_description; // 경력기술서(이전직장에서 업무 설명 textarea)

	public int getCareer_no() {
		return career_no;
	}

	public void setCareer_no(int career_no) {
		this.career_no = career_no;
	}

	public int getCareer_apply_no() {
		return career_apply_no;
	}

	public void setCareer_apply_no(int career_apply_no) {
		this.career_apply_no = career_apply_no;
	}

	public String getCareer_company_name() {
		return career_company_name;
	}

	public void setCareer_company_name(String career_company_name) {
		this.career_company_name = career_company_name;
	}

	public String getCareer_department() {
		return career_department;
	}

	public void setCareer_department(String career_department) {
		this.career_department = career_department;
	}

	public Date getCareer_enter_date() {
		return career_enter_date;
	}

	public void setCareer_enter_date(Date career_enter_date) {
		this.career_enter_date = career_enter_date;
	}

	public Date getCareer_leave_date() {
		return career_leave_date;
	}

	public void setCareer_leave_date(Date career_leave_date) {
		this.career_leave_date = career_leave_date;
	}

	public String getCareer_position() {
		return career_position;
	}

	public void setCareer_position(String career_position) {
		this.career_position = career_position;
	}

	public String getCareer_job() {
		return career_job;
	}

	public void setCareer_job(String career_job) {
		this.career_job = career_job;
	}

	public int getCareer_pay() {
		return career_pay;
	}

	public void setCareer_pay(int career_pay) {
		this.career_pay = career_pay;
	}

	public String getCareer_job_explan() {
		return career_job_explan;
	}

	public void setCareer_job_explan(String career_job_explan) {
		this.career_job_explan = career_job_explan;
	}

	public int getCareer_duration() {
		return career_duration;
	}

	public void setCareer_duration(int career_duration) {
		this.career_duration = career_duration;
	}

	public String getCareer_description() {
		return career_description;
	}

	public void setCareer_description(String career_description) {
		this.career_description = career_description;
	}

}
