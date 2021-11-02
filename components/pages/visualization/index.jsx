/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/* eslint-disable */

import { useRef, useEffect } from 'react';

import useScriptTag from '../../../global/hooks/useScriptTag';
import PageLayout from '../../PageLayout';
import './lib/jquery-ui.css';
import styles from './VisualizationComponent.module.css';

const VisualizationComponent = () => {
  const scriptRef = useRef(null);
  const dialogRef = useRef(null);

  const jQueryLoaded = useScriptTag({
    parentRef: scriptRef,
    src: '//code.jquery.com/jquery-3.6.0.min.js',
  });

  const jQueryUILoaded = useScriptTag({
    dependency: jQueryLoaded,
    parentRef: scriptRef,
    src: '//code.jquery.com/ui/1.13.0/jquery-ui.min.js',
  });

  useEffect(() => {
    // check that jQuery & jQuery-UI are loaded and available
    const hasjQueryUI = !!(jQueryUILoaded && window.jQuery);

    // store ref.current, in case it changes.
    const scriptRef = dialogRef.current;

    if (hasjQueryUI) {
      // instantiate jQuery & jQuery-UI functions
      scriptRef && $(scriptRef).tooltip({ show: null });
    }

    return () => {
      // cleanup
      if (hasjQueryUI) {
        scriptRef && $(scriptRef).tooltip('destroy');
      }
    };
  }, [jQueryUILoaded]);

  return (
    <PageLayout subtitle="JQuery Test">
      <div className={styles.covizu} ref={scriptRef}>
        {jQueryUILoaded ? (
          <>
            <div class="tooltip" id="tooltipContainer"></div>
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </PageLayout>
  );
};

export default VisualizationComponent;
