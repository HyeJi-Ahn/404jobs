package VO;

public class khFavCompanyVO {
	private int fav_no; // 구분자
	private int fav_company_no; // 관심기업 사업자 등록번호
	private String fav_mem_id; // 관심있어하는 회원 id

	public int getFav_no() {
		return fav_no;
	}

	public void setFav_no(int fav_no) {
		this.fav_no = fav_no;
	}

	public int getFav_company_no() {
		return fav_company_no;
	}

	public void setFav_company_no(int fav_company_no) {
		this.fav_company_no = fav_company_no;
	}

	public String getFav_mem_id() {
		return fav_mem_id;
	}

	public void setFav_mem_id(String fav_mem_id) {
		this.fav_mem_id = fav_mem_id;
	}

}
