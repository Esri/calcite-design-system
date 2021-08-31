The JSON sample user below is returned from a [search for users](https://developers.arcgis.com/rest/users-groups-and-items/user-search.htm). You can create an avatar for Ron by passing these properties directly to the avatar component.

When no thumbnail is provided, the avatar component will construct a useful placeholder, leveraging the user's information to construct a unique background-color with initials.

**Note:** if your user is private, remember to append a token to the end of the thumbnail using the form `thumbnail.jpg?token=YOUR_LOGGED_IN_USER_TOKEN`.

```json
{
  "username": "ron_swanson_pawnee",
  "id": "a81470986eaeee1833b74b7d8abcd5b2",
  "fullName": "Ron Swanson",
  "firstName": "Ron",
  "lastName": "Swanson",
  "thumbnail": "mySelf.jpg",
  ...
}
```

```html
<calcite-avatar
  username="ron_swanson_pawnee"
  user-id="a81470986eaeee1833b74b7d8abcd5b2"
  full-name="Ron Swanson"
  thumbnail="mySelf.jpg"
>
</calcite-avatar>
```
