package VO;

public class khPortfolioVO {
	private int portfolio_no; // 식별자
	private int portfolio_apply_no; // 포폴이 붙을 이력서 No
	private String portfolio_url; // 링크
	private String portfolio_file_orgname; // 원본 파일명(파일첨부시)
	private String portfolio_file_savname; // 저장될 파일명(파일첨부시)

	public int getPortfolio_no() {
		return portfolio_no;
	}

	public void setPortfolio_no(int portfolio_no) {
		this.portfolio_no = portfolio_no;
	}

	public int getPortfolio_apply_no() {
		return portfolio_apply_no;
	}

	public void setPortfolio_apply_no(int portfolio_apply_no) {
		this.portfolio_apply_no = portfolio_apply_no;
	}

	public String getPortfolio_url() {
		return portfolio_url;
	}

	public void setPortfolio_url(String portfolio_url) {
		this.portfolio_url = portfolio_url;
	}

	public String getPortfolio_file_orgname() {
		return portfolio_file_orgname;
	}

	public void setPortfolio_file_orgname(String portfolio_file_orgname) {
		this.portfolio_file_orgname = portfolio_file_orgname;
	}

	public String getPortfolio_file_savname() {
		return portfolio_file_savname;
	}

	public void setPortfolio_file_savname(String portfolio_file_savname) {
		this.portfolio_file_savname = portfolio_file_savname;
	}

}
