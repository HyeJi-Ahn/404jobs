package VO;

import java.util.Date;

public class companyMypageVO {
	private int c_no;				// 사업자등록번호
	private Date c_date; 			// 설립일
	private int c_em_num; 			// 사원수
	private int c_capital; 		// 자본
	private int c_sales; 			// 매출
	private int c_pay; 			// 연봉
	private String c_homepage; 		// 기업홈페이지
	
	public int getC_no() {
		return c_no;
	}
	public void setC_no(int c_no) {
		this.c_no = c_no;
	}
	public Date getC_date() {
		return c_date;
	}
	public void setC_date(Date c_date) {
		this.c_date = c_date;
	}
	public int getC_em_num() {
		return c_em_num;
	}
	public void setC_em_num(int c_em_num) {
		this.c_em_num = c_em_num;
	}
	public int getC_capital() {
		return c_capital;
	}
	public void setC_capital(int c_capital) {
		this.c_capital = c_capital;
	}
	public int getC_sales() {
		return c_sales;
	}
	public void setC_sales(int c_sales) {
		this.c_sales = c_sales;
	}
	public int getC_pay() {
		return c_pay;
	}
	public void setC_pay(int c_pay) {
		this.c_pay = c_pay;
	}
	public String getC_homepage() {
		return c_homepage;
	}
	public void setC_homepage(String c_homepage) {
		this.c_homepage = c_homepage;
	}



}
