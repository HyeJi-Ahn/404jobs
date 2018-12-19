package VO;

public class khApplyHrVO {
	private int apply_no; // 지원 목록 번호
	private int apply_company_no; // 지원받은 기업의 사업자 등록번호
	private String apply_mem_id; // 지원한 인재 Id

	public int getApply_no() {
		return apply_no;
	}

	public void setApply_no(int apply_no) {
		this.apply_no = apply_no;
	}

	public int getApply_company_no() {
		return apply_company_no;
	}

	public void setApply_company_no(int apply_company_no) {
		this.apply_company_no = apply_company_no;
	}

	public String getApply_mem_id() {
		return apply_mem_id;
	}

	public void setApply_mem_id(String apply_mem_id) {
		this.apply_mem_id = apply_mem_id;
	}

}
