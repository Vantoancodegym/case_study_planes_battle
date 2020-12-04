const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";
const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_DEFAULT = ORIENTATION_UP;

const IMAGE_PLANE_SIZE = 40;
const PLANE_SPEED = 10;

const MY_PLANE_COLOR = "red";
const MY_PLANE_HP = 100;

const ENEMY_COLOR = "yellow";
const BOSS_COLOR = "violet";
const ENEMY_HP = 50;
const BOSS_HP = 200;
const BOSS_SIZE = 40;
let enemy_speed=3;

const BULLET_DEFAULT_RADIUS = 2;
const BULLET_DEFAULT_SPEED = 20;
const BULLET_DEFAULT_DAMAGE = 30;
let bullet_color = "red";

const SCORE_DEFAULT_COLOR = "red";
const FONT = "bold 20px verdana, sans-serif";

const REVERSE = -1;
const NONREVERSE = 1;

const TIME_SETINTERVAL_DEFAULT = 100;

let dataPlanes = [[200, 200, PLANE_SPEED, MY_PLANE_HP, MY_PLANE_COLOR],
    [0, 100, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [100, canvas.height-IMAGE_PLANE_SIZE, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [canvas.width-IMAGE_PLANE_SIZE, 430, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [400, 222, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [30, 60, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [50, canvas.height-IMAGE_PLANE_SIZE-30, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [canvas.width-IMAGE_PLANE_SIZE -50, 150, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [140, 333, enemy_speed, ENEMY_HP, ENEMY_COLOR],
    [0, 0, enemy_speed, BOSS_HP, BOSS_COLOR]
];
