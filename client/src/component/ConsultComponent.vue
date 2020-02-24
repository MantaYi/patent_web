<template>
  <div class="consult">
    <router-link to="/consult">
      <button data-text="咨询" class="btn btn-primary btn-ghost btn-border-stroke btn-text-float-up">
        <div class="btn-borders">
          <div class="border-top"></div>
          <div class="border-right"></div>
          <div class="border-bottom"></div>
          <div class="border-left"></div>
        </div>
        <span class="btn-text">
          <i class="el-icon-s-comment"></i>
          <p>咨询入口</p>
        </span>
      </button>
    </router-link>
  </div>
</template>
<style lang="less" scoped>
.consult {
  width: 80px;
  height: 100px;
  background-color: #fff;
  border-radius: 5px;
  position: fixed;
  top: 500px;
  right: 150px;
  .btn {
    width: 100px;
    height: 50px;
    position: relative;
    text-decoration: none;
    background-color: #003472;
    border: 1px solid #003472;
    outline: transparent;
    overflow: hidden;
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      background: #003472;
    }
    &-ghost {
      color: #003472;
      background-color: transparent;
      border-color: #003472;
      &:hover {
        color: white;
      }
    }
    &-border-stroke {
      border-color: #003472;
      .btn-borders {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .border-top {
          position: absolute;
          top: 0;
          width: 100%;
          height: 1px;
          background: #003472;
          transform: scaleX(0);
          transform-origin: left;
        }
        .border-right {
          position: absolute;
          right: 0;
          width: 1px;
          height: 100%;
          background: #003472;
          transform: scaleY(0);
          transform-origin: bottom;
        }
        .border-bottom {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 1px;
          background: #003472;
          transform: scaleX(0);
          transform-origin: left;
        }
        .border-left {
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background: #003472;
          transform: scaleY(0);
          transform-origin: bottom;
        }
        .border-left {
          transition: 0.65s 0.25s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .border-bottom {
          transition: 0.65s 0.25s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .border-right {
          transition: 0.25s cubic-bezier(0.95, 0.05, 0.795, 0.035);
        }
        .border-top {
          transition: 0.25s cubic-bezier(0.95, 0.05, 0.795, 0.035);
        }
      }
      &:hover {
        color: #003472;
        background: transparent;
        .border-top,
        .border-bottom {
          transform: scaleX(1);
        }
        .border-left,
        .border-right {
          transform: scaleY(1);
        }
        .border-left {
          transition: 0.25s cubic-bezier(0.95, 0.05, 0.795, 0.035);
        }
        .border-bottom {
          transition: 0.25s cubic-bezier(0.95, 0.05, 0.795, 0.035);
        }

        .border-right {
          transition: 0.65s 0.25s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .border-top {
          transition: 0.65s 0.25s cubic-bezier(0.19, 1, 0.22, 1);
        }
      }
    }
    &-text-float-up {
      &::after {
        position: absolute;
        content: attr(data-text);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transform: translateY(35%);
        transition: 0.25s ease-out;
      }
      .btn-text {
        display: block;
        transition: 0.75s 0.1s cubic-bezier(0.19, 1, 0.22, 1);
        i {
          font-size: 26px;
        }
        p {
          font-size: 18px;
        }
      }
      &:hover {
        .btn-text {
          opacity: 0;
          transform: translateY(-25%);
          transition: 0.25s ease-out;
        }
        &::after {
          opacity: 1;
          transform: translateY(0);
          transition: 0.75s 0.1s cubic-bezier(0.19, 1, 0.22, 1);
        }
      }
    }
  }
}
</style>