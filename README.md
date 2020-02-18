# Todos

- check for checkmate
  - king is in check
    - check every piece on the board, are they checking the king?
    - before someone makes a move, will the new state have their king in check?
      - leave a blank for special case for kings not seeing each other
  - king can't move
  - no piece can block the check
- check for stalemate
  - king can't move
  - king is not in check
  - no other piece can move
- Kings can't see each other
  - test case for it
- on init, spawn random pieces in random places

# Why

- Inpsired by [Really bad chess](https://play.google.com/store/apps/details?id=com.noodlecake.reallybadchess&hl=en_CA)
  - Chess played with random pieces
- This is a version except for Chinese Chess
