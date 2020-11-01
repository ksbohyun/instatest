import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import UserContext from '../../context/UserContext';
import '../scss/DirectMessage.scss';

// default는 js 파일 하나당 하나씩만 넣을 수 있다.
const DirectMessage = () => {
  const { userData } = useContext(UserContext);
  const { setShowHeader } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    if (!userData.user) {
      setShowHeader(false);
      history.push('/login');
    }
  });
  return (
    <div className="dm">
      {/* DM 상대 */}
      <div className="dm--list">
        <div className="dm--list__head">
          <h1 className="dm--list__headTit">Direct</h1>

          <button type="button" name="dmBtn" className="dm--list__headBtn">
            <img src="/index/icon/icon_dm_btn.jpg" alt="새로 쓰기" />
          </button>
        </div>

        <div className="dm--list__people">
          <ul>
            <li>
              <div className="dm--list__profile">
                <img src="/index/img_profile_01.png" alt="@@님의 프로필 사진" />
              </div>

              <div className="dm--list__idBox">
                <p className="dm--list__id">Apeach</p>
                <p className="dm--list__message">
                  메시지를 좋아합니다
                  <span className="dm--list__date">6주</span>
                </p>
              </div>
            </li>

            <li>
              <div className="dm--list__profile">
                <img src="/index/img_profile_02.png" alt="@@님의 프로필 사진" />
              </div>

              <div className="dm--list__idBox">
                <p className="dm--list__id">muzi</p>
                <p className="dm--list__message">
                  메시지를 좋아합니다<span className="dm--list__date">6주</span>
                </p>
              </div>
            </li>

            <li>
              <div className="dm--list__profile">
                <img src="/index/img_profile_03.png" alt="@@님의 프로필 사진" />
              </div>

              <div className="dm--list__idBox">
                <p className="dm--list__id">ryan</p>
                <p className="dm--list__message">
                  지금 활동 중 <span className="dm--list__date">6주</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* //DM 상대 */}

      {/* DM 내용 */}
      <div className="dm--chat">
        <div className="dm--chat__box">
          <h2>내 메시지</h2>
          <p>친구나 그룹에 비공개 사진과 메시지를 보내보세요.</p>
          <input
            type="button"
            value="메시지 보내기"
            placeholder="메시지 보내기"
          />
        </div>
      </div>
      {/* //DM 내용 */}
    </div>
  );
};

export default DirectMessage;
