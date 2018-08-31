package com.ryan.framework.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author: RyanYin
 */
public class Page<E> implements Serializable {

    private static final long serialVersionUID = -6707751589725091287L;

    private static final int DEFAULT_PAGE_NO = 1;
    private static final int DEFAULT_PAGE_SIZE = 10;

    private int totalCount;
    private int pageNo = DEFAULT_PAGE_NO;
    private int pageSize = DEFAULT_PAGE_SIZE;

    private List<E> items;

    private int totalPage;
    private int prePageNo;
    private int nextPageNo;
    private boolean isFirstPage = false;
    private boolean isLastPage = false;

    public Page(int pageNo, int pageSize, List<E> items) {
        this(pageNo, pageSize, items, items.size());
    }

    public Page(int pageNo, int pageSize, List<E> items, int totalCount) {
        this.pageNo = pageNo < 1 ? DEFAULT_PAGE_NO : pageNo;
        this.pageSize = pageSize < 1 ? DEFAULT_PAGE_SIZE : pageSize;
        this.items = (List<E>) (items != null ? items : new ArrayList<>());
        this.totalCount = totalCount;
        this.setOtherProperty();
    }

    private void setOtherProperty() {
        this.totalPage = this.totalCount / this.pageSize + (this.totalCount % this.pageSize != 0 ? 1 : 0);
        this.prePageNo = this.pageNo > 1 ? this.pageNo - 1 : 1;
        this.nextPageNo = this.pageNo < this.totalPage ? this.pageNo + 1 : this.totalPage;
        this.isFirstPage = this.pageNo == 1;
        this.isLastPage = this.pageNo == this.totalPage;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public List<E> getItems() {
        return items;
    }

    public void setItems(List<E> items) {
        this.items = items;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getPrePageNo() {
        return prePageNo;
    }

    public void setPrePageNo(int prePageNo) {
        this.prePageNo = prePageNo;
    }

    public int getNextPageNo() {
        return nextPageNo;
    }

    public void setNextPageNo(int nextPageNo) {
        this.nextPageNo = nextPageNo;
    }

    public boolean isFirstPage() {
        return isFirstPage;
    }

    public void setFirstPage(boolean firstPage) {
        isFirstPage = firstPage;
    }

    public boolean isLastPage() {
        return isLastPage;
    }

    public void setLastPage(boolean lastPage) {
        isLastPage = lastPage;
    }
}
