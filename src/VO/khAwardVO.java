package VO;

import java.util.Date;

public class khAwardVO {
	private int award_no; // 식별자
	private int award_apply_no; // 수상내역/자격증이 추가 될 이력서No
	private String award_name; // 수상내역/자격증 이름
	private String award_publisher; // 발행기관
	private Date award_date; // 취득일

	public int getAward_no() {
		return award_no;
	}

	public void setAward_no(int award_no) {
		this.award_no = award_no;
	}

	public int getAward_apply_no() {
		return award_apply_no;
	}

	public void setAward_apply_no(int award_apply_no) {
		this.award_apply_no = award_apply_no;
	}

	public String getAward_name() {
		return award_name;
	}

	public void setAward_name(String award_name) {
		this.award_name = award_name;
	}

	public String getAward_publisher() {
		return award_publisher;
	}

	public void setAward_publisher(String award_publisher) {
		this.award_publisher = award_publisher;
	}

	public Date getAward_date() {
		return award_date;
	}

	public void setAward_date(Date award_date) {
		this.award_date = award_date;
	}

}
