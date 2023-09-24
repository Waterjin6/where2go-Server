export const SUCCESS = { "isSuccess": true, "code": 1000, "message": "성공" };
export const HABIT_CREATE_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 생성 성공" };
export const HABIT_UPDATE_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 변경 성공" };
export const HABIT_DELETE_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 삭제 성공" };
export const HABIT_INVITE_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 초대 성공" };
export const HABIT_INVITE_ACCEPT_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 초대 수락 성공" };
export const HABIT_INVITE_REJECT_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 초대 거절 성공" };
export const HABIT_CHECK_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 체크 성공" };
export const HABIT_NOCHECK_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 체크x 성공" };
export const HABIT_ACHIEVEMENT_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 성취 성공" };
export const ALL_ALARM_ON_SUCCESS = { "isSuccess": true, "code": 201, "message": "전체 알람 ON 성공" };
export const ALL_ALARM_OFF_SUCCESS = { "isSuccess": true, "code": 201, "message": "전체 알람 OFF 성공" };
export const HABIT_CHECK_ALARM_ON_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 체크 알람 ON 성공" };
export const HABIT_CHECK_ALARM_OFF_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 체크 알람 OFF 성공" };
export const HABIT_INVITE_ALARM_ON_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 초대 알람 ON 성공" };
export const HABIT_INVITE_ALARM_OFF_SUCCESS = { "isSuccess": true, "code": 201, "message": "습관 초대 알람 OFF 성공" };
export const FRIEND_REQUEST_ON_SUCCESS = { "isSuccess": true, "code": 201, "message": "친구 요청 알람 ON 성공" };
export const FRIEND_REQUEST_OFF_SUCCESS = { "isSuccess": true, "code": 201, "message": "친구 요청 알람 OFF 성공" };
export const FRIEND_AWARD_ON_SUCCESS = { "isSuccess": true, "code": 201, "message": "친구 어워드 알람 ON 성공" };
export const FRIEND_AWARD_OFF_SUCCESS = { "isSuccess": true, "code": 201, "message": "친구 어워드 알람 OFF 성공" };
export const ALARM_SHOW_SUCCESS = { "isSuccess": true, "code": 210, "message": "알람 조회 성공" };
export const TOKEN_EMPTY = { "isSuccess": false, "code": 2000, "message": "JWT 토큰을 입력해주세요." };
export const TOKEN_VERIFICATION_FAILURE = { "isSuccess": false, "code": 3000, "message": "JWT 토큰 검증 실패" };
export const TOKEN_VERIFICATION_SUCCESS = { "isSuccess": true, "code": 1001, "message": "JWT 토큰 검증 성공" };
export const SIGNUP_EMAIL_EMPTY = { "isSuccess": false, "code": 2001, "message": "이메일을 입력해주세요" };
export const SIGNUP_EMAIL_LENGTH = { "isSuccess": false, "code": 2002, "message": "이메일은 30자리 미만으로 입력해주세요." };
export const SIGNUP_EMAIL_ERROR_TYPE = { "isSuccess": false, "code": 2003, "message": "이메일을 형식을 정확하게 입력해주세요." };
export const SIGNUP_PASSWORD_EMPTY = { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." };
export const SIGNUP_PASSWORD_LENGTH = { "isSuccess": false, "code": 2005, "message": "비밀번호는 6~20자리를 입력해주세요." };
export const SIGNUP_NICKNAME_EMPTY = { "isSuccess": false, "code": 2006, "message": "닉네임을 입력 해주세요." };
export const SIGNUP_NICKNAME_LENGTH = { "isSuccess": false, "code": 2007, "message": "닉네임은 최대 10자리를 입력해주세요." };
export const SIGNIN_EMAIL_EMPTY = { "isSuccess": false, "code": 2008, "message": "이메일을 입력해주세요" };
export const SIGNIN_EMAIL_LENGTH = { "isSuccess": false, "code": 2009, "message": "이메일은 30자리 미만으로 입력해주세요." };
export const SIGNIN_EMAIL_ERROR_TYPE = { "isSuccess": false, "code": 2010, "message": "이메일을 형식을 정확하게 입력해주세요." };
export const SIGNIN_PASSWORD_EMPTY = { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." };
export const SIGNIN_PASSWORD_LENGTH = { "isSuccess": false, "code": 2012, "message": "비밀번호는 6~20자리를 입력해주세요." };
export const SIGNUP_PROMISE_EMPTY = { "isSuccess": false, "code": 2037, "message": "한줄다짐을 입력해주세요." };
export const SIGNUP_PROMISE_LENGTH = { "isSuccess": false, "code": 2038, "message": "한줄다짐은 30자 이내로 입력해주세요." };
export const USER_USERID_EMPTY = { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." };
export const USER_USERID_NOT_EXIST = { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." };
export const USER_USEREMAIL_EMPTY = { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." };
export const USER_USEREMAIL_NOT_EXIST = { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." };
export const USER_ID_NOT_MATCH = { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" };
export const USER_NICKNAME_EMPTY = { "isSuccess": false, "code": 2017, "message": "닉네임 값을 입력해주세요" };
export const USER_PASSWORD_EMPTY = { "isSuccess": false, "code": 2018, "message": "비밀번호 값을 입력해주세요" };
export const USER_IDX_EMPTY = { "isSuccess": false, "code": 2030, "message": "유저 인덱스를 입력해주세요" };
export const USER_STATUS_EMPTY = { "isSuccess": false, "code": 2027, "message": "회원 상태값을 입력해주세요" };
export const COMM_ISPARENT_EMPTY = { "isSuccess": false, "code": 2028, "message": "대댓글 여부를 입력해주세요" };
export const COMM_CONTENT_EMPTY = { "isSuccess": false, "code": 2029, "message": "내용을 입력해주세요" };
export const COMM_ID_EMPTY = { "isSuccess": false, "code": 2030, "message": "댓글 ID를 입력해주세요" };
export const HABIT_EMOJI_EMPTY = { "isSuccess": false, "code": 2031, "message": "이모지를 선택해주세요" };
export const HABIT_NAME_EMPTY = { "isSuccess": false, "code": 2032, "message": "습관명을 입력해주세요" };
export const HABIT_CONTENTS_EMPTY = { "isSuccess": false, "code": 2033, "message": "내용을 입력해주세요" };
export const HABIT_CATEGORYIDX_EMPTY = { "isSuccess": false, "code": 2046, "message": "카테고리 인덱스를 입력해주세요" };
export const HABIT_HABITDAY_EMPTY = { "isSuccess": false, "code": 2047, "message": "수행일을 입력해주세요" };
export const HABIT_ISPRIVATE_EMPTY = { "isSuccess": false, "code": 2048, "message": "비공개 여부를 입력해주세요" };
export const HABIT_EMOGE_LENGTH = { "isSuccess": false, "code": 2034, "message": "이모지는 한개만 선택해주세요" };
export const HABIT_NAME_LENGTH = { "isSuccess": false, "code": 2035, "message": "길이는 20 이하로 설정해주세요" };
export const HABIT_CONTENTS_LENGTH = { "isSuccess": false, "code": 2036, "message": "길이는 50 이하로 설정해주세요" };
export const FOLLOW_WRONG_REQUEST = { "isSuccess": false, "code": 2039, "message": "잘못된 요청 값입니다." };
export const FOLLOW_USER_NOT_EXIST = { "isSuccess": false, "code": 2040, "message": "검색 결과가 없습니다." };
export const FOLLOW_EMAIL_NOT_EXIST = { "isSuccess": false, "code": 2041, "message": "이메일 검색 결과가 없습니다." };
export const FOLLOW_REQUEST_NOT_EXIST = { "isSuccess": false, "code": 2042, "message": "친구 신청 이력이 없습니다." };
export const HABIT_ID_EMPTY = { "isSuccess": false, "code": 2043, "message": "습관 ID를 입력해주세요" };
export const FOLLOW_NICKNAME_EMPTY = { "isSuccess": false, "code": 2044, "message": "검색할 닉네임을 입력해주세요." };
export const FOLLOW_EMAIL_EMPTY = { "isSuccess": false, "code": 2045, "message": "검색할 이메일을 입력해주세요." };
export const FEEDBACK_NO_TITLE = { "isSuccess": false, "code": 2044, "message": "제목을 입력해주세요." };
export const FEEDBACK_NO_CONTENT = { "isSuccess": false, "code": 2045, "message": "내용을 입력해주세요." };
export const BASIC_PHRASE = { "isSuccess": false, "code": 7000, "message": "DB에 등록된 명언문구가 없어 기본 문구를 return합니다." };
export const SIGNUP_REDUNDANT_EMAIL = { "isSuccess": false, "code": 3001, "message": "이미 등록된 이메일입니다." };
export const SIGNUP_REDUNDANT_NICKNAME = { "isSuccess": false, "code": 3002, "message": "중복된 닉네임입니다." };
export const SIGNUP_EMAIL_CHECK_SUCCESS = { "isSuccess": true, "code": 3007, "message": "등록가능한 이메일입니다." };
export const SIGNUP_NICKNAME_CHECK_SUCCESS = { "isSuccess": true, "code": 3008, "message": "사용가능한 닉네임입니다." };
export const SIGNIN_EMAIL_WRONG = { "isSuccess": false, "code": 3003, "message": "등록되지않은 이메일입니다." };
export const SIGNIN_PASSWORD_WRONG = { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." };
export const SIGNIN_INACTIVE_ACCOUNT = { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." };
export const SIGNIN_WITHDRAWAL_ACCOUNT = { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." };
export const HABIT_REDUNDANT_INVITE = { "isSuccess": false, "code": 3007, "message": "이미 초대된 습관입니다." };
export const HABIT_CONTENT_NULL = { "isSuccess": false, "code": 3007, "message": "조회되는 습관이 없습니다." };
export const DB_ERROR = { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러" };
export const SERVER_ERROR = { "isSuccess": false, "code": 4001, "message": "서버 에러" };
export const SENDGRID_ERROR = { "isSuccess": false, "code": 4002, "message": "이메일 전송 에러" };
export const USER_VISITED_EVENT_EMPTY = { "isSuccess": true, "code": 5000, "message": "유저가 방문한 이벤트가 없습니다" };
export const PASSWORD_MATCH = { "isSuccess": true, "code": 5001, "message": "비밀번호가 일치합니다." };
export const BIG_AREACODE_EMPTY = { "isSuccess": false, "code": 5002, "message": "광역시/도 지역코드를 입력해주세요." };
export const SMALL_AREACODE_EMPTY = { "isSuccess": false, "code": 5005, "message": "광역시/도 지역코드를 입력해주세요." };
export const BIG_AREACODE_NOT_EXIST = { "isSuccess": false, "code": 5003, "message": "광역시/도 지역코드가 존재하지 않습니다." };
export const SMALL_AREACODE_NOT_EXIST = { "isSuccess": false, "code": 5004, "message": "시/군/구 지역코드가 존재하지 않습니다." };
export const AREACODE_LIST_ERROR = { "isSuccess": false, "code": 5006, "message": "지역 리스트를 DB에서 불러오지 못했습니다." };
export const KINDCODE_EMPTY = { "isSuccess": false, "code": 5007, "message": "종류 코드를 입력해주세요" };
export const KIND_LIST_ERROR = { "isSuccess": false, "code": 5008, "message": "종류 리스트를 DB에서 불러오는데에 실패하였습니다." };
export const KIND_NOT_EXIST = { "isSuccess": false, "code": 5009, "message": "존재하지 않는 종류코드입니다." };
export const MAIN_BOARD_CONTENTS_NOT_EXIST = { "isSuccess": false, "code": 5010, "message": "메인보드에 띄울 컨텐츠가 DB에 존재하지 않습니다." };
export const TOP_EVENT_LOADING_ERROR = { "isSuccess": false, "code": 5011, "message": "Top이벤트에 띄울 컨텐츠가 DB에 존재하지 않습니다." };
export const RECOMMAND_EVENT_LOADING_ERROR = { "isSuccess": false, "code": 5012, "message": "성별/연령대별 추천에 띄울 컨텐츠가 DB에 존재하지 않습니다." };
export const USER_TOP_EVENT_LOADING_ERROR = { "isSuccess": false, "code": 5013, "message": "사용자 성별/연령대별 맞춤 추천 컨텐츠가 DB에 존재하지 않습니다." };
export const EVENT_ID_EMPTY = { "isSuccess": false, "code": 5014, "message": "이벤트ID를 입력해주세요." };
export const EVENT_INFO_NOT_EXIST = { "isSuccess": false, "code": 5015, "message": "이벤트ID에 해당하는 이벤트 정보가 존재하지 않습니다." };
export const EVENT_USER_INFO_ERROR = { "isSuccess": false, "code": 5016, "message": "사용자의 이벤트 방문함/저장함 여부를 확인할 수 없습니다." };
export const EVENT_NOT_SAVED = { "isSuccess": false, "code": 5017, "message": "저장되지 않은 이벤트입니다." };
export const EVENT_ALREADY_SAVED = { "isSuccess": false, "code": 5018, "message": "이미 저장된 이벤트입니다." };
export const CHECK_SAVED_EVENT_ERROR = { "isSuccess": false, "code": 5019, "message": "이벤트 저장 여부를 확인할 수 없습니다." };
export const EVENT_NOT_EXIST = { "isSuccess": false, "code": 5020, "message": "DB에 등록되지않은 이벤트입니다." };
export const SAVED_EVENTS_GET_ERROR = { "isSuccess": false, "code": 5021, "message": "저장된 이벤트 목록을 불러올 수 없습니다." };
export const VISITED_EVENTS_GET_ERROR = { "isSuccess": false, "code": 5022, "message": "방문한 이벤트 목록을 불러올 수 없습니다." };
export const CHECK_VISITED_EVENT_ERROR = { "isSuccess": false, "code": 5023, "message": "이벤트 방문 여부를 확인할 수 없습니다." };
export const EVENT_NOT_VISITED = { "isSuccess": false, "code": 5024, "message": "방문하지 않은 이벤트입니다." };
export const EVENT_ALREADY_VISITED = { "isSuccess": false, "code": 5025, "message": "이미 방문한 이벤트입니다." };
export const KEYWORD_LIST_GET_ERROR = { "isSuccess": false, "code": 5026, "message": "사용자의 키워드 리스트를 불러오지 못하였습니다." };
export const KEYWORD_EMPTY = { "isSuccess": false, "code": 5027, "message": "키워드가 입력되지 않았습니다." };
export const KEYWORD_ALREADY_EXIST = { "isSuccess": false, "code": 5028, "message": "이미 등록된 키워드입니다." };
export const KEYWORD_NO_EXIST = { "isSuccess": false, "code": 5029, "message": "등록되지 않은 키워드입니다." };
export const GET_HOT_SEARCH_ERROR = { "isSuccess": false, "code": 5030, "message": "인기검색어를 불러올 수 없습니다." };

export const STAR_EMPTY = { "isSuccess": false, "code": 5031, "message": "별점이 비었습니다." };
export const COMPANION_ID_EMPTY = { "isSuccess": false, "code": 5032, "message": "동행자 ID가 비었습니다." };
export const REVIEW_EMPTY = { "isSuccess": false, "code": 5033, "message": "리뷰가 비었습니다." };
export const IS_PRIVATE_EMPTY = { "isSuccess": false, "code": 5034, "message": "공개여부가 비었습니다." };
export const REVIEWS_GET_ERROR = { "isSuccess": false, "code": 5035, "message": "리뷰를 불러올 수 없습니다." };
export const REVIEW_ID_EMPTY = { "isSuccess": false, "code": 5036, "message": "리뷰아이디가 비었습니다" };
export const REVIEW_IS_PRIVATE = { "isSuccess": false, "code": 5037, "message": "비공개 리뷰입니다." };
export const COMPANION_LIST_ERROR = { "isSuccess": false, "code": 5038, "message": "동행자 리스트를 불러올 수 없습니다." };
export const COMPANION_POP_LIST_ERROR = { "isSuccess": false, "code": 5039, "message": "동행자 인기순 리스트를 불러올 수 없습니다." };
export const CHECK_REVIEW_LIKED_ERROR = { "isSuccess": false, "code": 5040, "message": "리뷰 좋아요 여부를 불러올 수 없습니다." };
export const REVIEW_ALREADY_LIKED = { "isSuccess": false, "code": 5041, "message": "이미 좋아요한 리뷰입니다." };
export const EVENT_RATE_INFO_GET_ERROR = { "isSuccess": false, "code": 5042, "message": "이벤트 평가 정보를 불러올 수 없습니다." };
export const COMPANION_VISIT_RATE_GET_ERROR = { "isSuccess": false, "code": 5043, "message": "동행자 방문율을 불러올 수 없습니다." };
export const COMPANION_VISIT_STAR_GET_ERROR = { "isSuccess": false, "code": 5044, "message": "동행자 별점을 불러올 수 없습니다." };
