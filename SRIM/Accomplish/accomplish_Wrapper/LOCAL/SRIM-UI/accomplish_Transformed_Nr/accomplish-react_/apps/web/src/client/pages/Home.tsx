import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TaskInputBar } from '@/components/landing/TaskInputBar';
import { SettingsDialog } from '@/components/layout/SettingsDialog';
import { springs } from '@/lib/animations';
import { PlusMenu } from '@/components/landing/PlusMenu';
import { useHomePage } from './home/useHomePage';
import { FavoritesSection } from './home/FavoritesSection';
import { ExamplesSection } from './home/ExamplesSection';

export function HomePage() {
  const { t } = useTranslation('home');
  const {
    prompt,
    setPrompt,
    showAllFavorites,
    setShowAllFavorites,
    attachments,
    attachmentError,
    setAttachments,
    workingDirectory,
    setWorkingDirectory,
    showSettingsDialog,
    settingsInitialTab,
    favoritesList,
    removeFavorite,
    isLoading,
    useCaseExamples,
    displayedFavorites,
    hasMoreFavorites,
    handleSubmit,
    handleSettingsDialogChange,
    handleOpenSpeechSettings,
    handleOpenModelSettings,
    handleApiKeySaved,
    handleExampleClick,
    handleSkillSelect,
    handleAttachFiles,
    handleOpenSettings,
    MAX_FILES,
  } = useHomePage();

  return (
    <>
      <SettingsDialog
        open={showSettingsDialog}
        onOpenChange={handleSettingsDialogChange}
        onApiKeySaved={handleApiKeySaved}
        initialTab={settingsInitialTab}
      />

      <div className="relative flex h-full flex-col overflow-hidden bg-accent">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-12%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-[-8%] top-[22%] h-[260px] w-[260px] rounded-full bg-primary/8 blur-[110px]" />
          <div className="absolute left-[-6%] bottom-[18%] h-[220px] w-[220px] rounded-full bg-foreground/[0.04] blur-[100px]" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-0 pt-6 sm:px-6">
          <div className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springs.gentle}
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_16px_50px_-28px_hsl(var(--primary)/0.45)] backdrop-blur"
            >
              DigiBull
            </motion.div>

            <motion.h1
              data-testid="home-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springs.gentle}
              className="w-full pt-20 text-center font-apparat text-[34px] tracking-[-0.03em] text-foreground sm:pt-28 sm:text-[42px] lg:pt-40 lg:text-[52px]"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.gentle, delay: 0.05 }}
              className="max-w-[620px] text-center text-sm leading-6 text-muted-foreground sm:text-[15px]"
            >
              Drop in a task, a folder, or a few files and let DigiBull route the right
              model, line up the steps, and get moving.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.gentle, delay: 0.1 }}
              className="w-full"
            >
              <TaskInputBar
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                placeholder={t('inputPlaceholder')}
                typingPlaceholder={true}
                large={true}
                autoFocus={true}
                autoSubmitOnTranscription={false}
                onOpenSpeechSettings={handleOpenSpeechSettings}
                onOpenModelSettings={handleOpenModelSettings}
                hideModelWhenNoModel={true}
                attachments={attachments}
                attachmentError={attachmentError}
                onAttachmentsChange={setAttachments}
                toolbarLeft={
                  <PlusMenu
                    onSkillSelect={handleSkillSelect}
                    onOpenSettings={handleOpenSettings}
                    onAttachFiles={handleAttachFiles}
                    onSelectFolder={setWorkingDirectory}
                    disabled={isLoading}
                    attachmentCount={attachments.length}
                    maxAttachments={MAX_FILES}
                  />
                }
              />
              {workingDirectory && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                  <span className="truncate max-w-[400px]" title={workingDirectory}>
                    {t('selectedFolder.badge', { folder: workingDirectory })}
                  </span>
                  <button
                    type="button"
                    onClick={() => setWorkingDirectory(undefined)}
                    className="ml-1 hover:text-foreground transition-colors"
                    aria-label={t('selectedFolder.clearAriaLabel')}
                  >
                    ✕
                  </button>
                </div>
              )}
            </motion.div>

            <FavoritesSection
              favoritesList={favoritesList}
              displayedFavorites={displayedFavorites}
              hasMoreFavorites={hasMoreFavorites}
              showAllFavorites={showAllFavorites}
              onSetPrompt={setPrompt}
              onRemoveFavorite={removeFavorite}
              onShowAll={() => setShowAllFavorites(true)}
            />

            <ExamplesSection
              useCaseExamples={useCaseExamples}
              onExampleClick={handleExampleClick}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-accent to-transparent" />
      </div>
    </>
  );
}
