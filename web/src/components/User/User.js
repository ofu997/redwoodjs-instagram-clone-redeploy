import Images from 'src/components/Images/Images'
import { Link, routes } from '@redwoodjs/router'
import { getLoggedInUser } from 'src/functions/WebFunctions'
import { MetaTags } from '@redwoodjs/web'

const User = ({ infoAndImages }) => {
  const { userImages } = infoAndImages;
  const sortedImages = [...userImages].sort((a,b) => b.id - a.id);
  return (
    <>
      <UserInfo user={infoAndImages} />
      <Images
        images={sortedImages}
      />
    </>
  )
}

const UserInfo = props => {
  const currentUser = getLoggedInUser();
  return (
    <>
      <MetaTags
        title={`${props.user.name} | Memofolio`}
        ogType='website'
        ogUrl={`https://memofolio.netlify.app/u/${props.user.handle}`}
        ogContentUrl={props.user.profilePicUrl}
        description={`${props.user.bio.substring(0, 75)}`}
        robots={['nofollow']}
      />
      <div id='user-info-container'>
        <section id='user-page-profile-pic'>
          <img src={props.user.profilePicUrl} />
        </section>
        <section id='user-page-user-info'>
          <div id='user-info-handle-editLink'>
            <h4>{props.user.handle}</h4>
            {currentUser.localStoragePassword === props.user.localStoragePassword && (
            <Link
              to={routes.editUserInfo({ handle: props.user.handle })}
              title={'Edit user ' + props.user.handle }
              className="link-that-does-not-look-like-a-link"
              id='edit-info-link'
            >
              <h4>Edit info</h4>
            </Link> )}
          </div>
          <p className='user-bio'><strong>{props.user.userImages.length}</strong>  {props.user.userImages.length == 1 ? `memo`:`memos`}</p>
          <h4>{props.user.name}</h4>
          <p className='user-bio'>{props.user.bio}</p>
        </section>
      </div>
    </>
  )
}

export default User
