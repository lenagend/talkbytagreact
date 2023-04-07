const CloseAccount = () => {
    return(
        <div class="tab-pane active show"  style={{textAlign : 'left'}}>
            <div class="card">
                <div class="card-header border-0 pb-0">
                    <h5 class="card-title">계정을 삭제합니다</h5>
                    <p class="mb-0">많이 즐기셨기를 바랍니다.</p>
                </div>
                <div class="card-body">
                    <h6>떠나기 전에...</h6>
                    <ul>
                        <li>작성했던 모든 게시물 삭제하기 <a href="#">클릭</a> </li>
                        <li>삭제하지 않고 계정을 삭제하면 게시물은 익명작성자 형태로 보관됩니다.</li>
                    </ul>
                    <div class="form-check form-check-md my-4">
                        <input class="form-check-input" type="checkbox" value="" id="deleteaccountCheck" />
                            <label class="form-check-label" for="deleteaccountCheck">네, 삭제하겠습니다.</label>
                    </div>
                    <a href="#" class="btn btn-danger btn-sm mb-0">지우겠습니다</a>
                </div>
            </div>
        </div>
);
}
export default CloseAccount;