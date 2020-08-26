import React from 'react';
import { connect } from 'dva';
import styles from './indexPage.less';

import LBT from '../components/lunbotu/lbt';

function IndexPage() {
  const imgArr = [require('../assets/img/a.jpg'),require('../assets/img/c.jpg'),require('../assets/img/d.png')];

  return (
    <div className={styles.demo}>
      <div className={styles.demo_lbt}>
        <LBT imgArr = {imgArr} width={300} height={200}></LBT>
      </div>

    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
