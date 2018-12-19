package VO;

public class khFavHrVO {
	private int fav_hr_no; // 관심인재 목록 번호
	private int fav_company_no; // 관심있어하는 기업의 사업자 등록번호
	private String fav_mem_id; // 관심 인재 Id

	public int getFav_hr_no() {
		return fav_hr_no;
	}

	public void setFav_hr_no(int fav_hr_no) {
		this.fav_hr_no = fav_hr_no;
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
